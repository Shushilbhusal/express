import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./jwt";
import { getToken } from "../models/mongodb-models/token/tokenServices";
import { types } from "util";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader =
      req.headers.authorization || req.cookies["authorization"];
      console.log("authorizationHeader", authorizationHeader);
    if (!authorizationHeader) {
      res.status(401).json({
        message: "Token not found in header or cookies !! Please login first to continue !!",
      });
      return;
    }

    if (typeof authorizationHeader !== "string") {
      res.status(401).json({
        message: "Token is not a string",
      });
      return;
    }
    const token = authorizationHeader?.split(" ")[1] || "";
    if (!token) {
      res.status(401).json({
        message: "Token not found",
      });
      return;
    }

    const payload = verifyToken(token);
    console.log("payload", payload);

    const tokenInDb = await getToken(authorizationHeader);
    if (!tokenInDb) {
      res.status(401).json({
        message: "Token not found you are already logged out !!",
      });
      return;
    }
    req.user = payload;
    next();
  } catch (error) {
    console.error(error);
    if ((error as any).name === "TokenExpiredError") {
      next({
        status: 400,
        message: "Token expired",
      });
      return;
    }
    if ((error as any).name === "JsonWebTokenError") {
      next({
        status: 400,
        message: "Invalid token",
      });
      return;
    }

    next({ message: "Internal server error", status: 500 });
  }
}
