import { Request, Response, NextFunction } from "express";
import { deleteToken } from "../../models/mongodb-models/token/tokenServices";

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loggedInUser = req.user;
    console.log("loggedInUser ", loggedInUser);
    if (!loggedInUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const token = req.cookies.authorization;
    if (!token) {
      res.status(400).json({ message: "Authorization token missing" });
      return;
    }

    res.clearCookie("authorization");

    const deleteUser = await deleteToken(loggedInUser.u_id, token);
    if (!deleteUser) {
      res.status(401).json({ message: "Token could not be deleted" });
      return;
    }

    res.status(200).json({ message: "Logged out successfully" });
    return;
  } catch (error) {
    console.error("Logout error:", error);
    next({
      status: 500,
      message: (error as Error).message,
    });
  }
};
