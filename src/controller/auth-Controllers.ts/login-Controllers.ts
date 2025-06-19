import { NextFunction, Request, Response } from "express";
import { findUserByEmail } from "../../models/mongodb-models/user/userServices";
import { comparePassword } from "../../utils/bcrypt";
import { generateToken, TPayLoad } from "../../utils/jwt";
import { EXPIRY_TIME_IN_SECONDS } from "../../utils/constant";
import { createToken } from "../../models/mongodb-models/token/tokenServices";

export const LoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_email, user_password } = req.body;

    // check if user exist or not in sign up/user table by using user email
    const user = await findUserByEmail(user_email);
    // console.log("user", user);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    // check if the entered password is matched or not with the actual password  password which was created while signed up
    console.log("u_password", user_password);
    console.log("hashed password", user.user_password);
    const isPasswordCorrect = await comparePassword({
      plainTestPassword: user_password,
      hashedPassword: user.user_password,
    });
    console.log("isPasswordCorrect", isPasswordCorrect);

    if (!isPasswordCorrect) {
      res.status(400).json({
      message: `Incorrect email or password`,
      });
    }

    const userPayload: TPayLoad = {
      u_id: user.id,
      u_name: user.user_name,
      u_email: user.user_email,
    };

    const token = generateToken(userPayload);
    console.log("generated token", token);

    const bearerToken = `Bearer ${token}`;

    res.cookie("authorization", bearerToken, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + EXPIRY_TIME_IN_SECONDS * 10000),
      sameSite: "lax",
      secure: process.env["ENVIRONMENT"] === "prod",
    });

    await createToken({
      u_id: user.id,
      token: bearerToken,
    });
    res.status(200).json({
      data: {
        token: bearerToken,
      },
      message: "you are logged in successfully!!",
    });

    return;
  } catch (error) {
    console.error("failed to logged in ", error);
    next(error);
  }
};
