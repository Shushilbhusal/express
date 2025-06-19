import { sign, verify } from "jsonwebtoken";
import { EXPIRY_TIME_IN_SECONDS } from "./constant";
import { error } from "console";
import dotenv from "dotenv";
dotenv.config();

export type TPayLoad = {
  u_id: string;
  u_name: string;
  u_email: string;
};

export const jwtSecret = process.env.JWT_SECRET || "";
if (!jwtSecret) {
  throw new Error("please set the secret for jwt.");
}

export function generateToken(payload: TPayLoad) {
  const token = sign(payload, jwtSecret, {
    expiresIn: EXPIRY_TIME_IN_SECONDS,
  });
  return token;
}

export function verifyToken(token: string): TPayLoad {
  const validatedToken = verify(token, jwtSecret);
  console.log("validatedToken", validatedToken);
  return validatedToken as TPayLoad;
}
