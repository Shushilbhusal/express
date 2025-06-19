// import express from "express";
// import { Request, Response } from "express";
// // import products, { createProduct } from '../models/product';
// // import { getallProduct, getProductById, updateProductById, deleteProductById } from '../models/product';
// // import { parse } from 'path';
// // const router= express.Router();

// import { get } from "http";

// import { userModel } from "../sql-models/user.sql-models";
// export const createUsersController = async (req: Request, res: Response) => {
//   const { user_name, name, email } = req.body;

//   if (!user_name || !name || !email) {
//     res.status(400).json({ error: "please provide appropriate input" });
//   }

//   const newUsers = await userModel.postUsers({
//     user_name,
//     name,
//     email,
//   });
//   console.log(newUsers);
//   res.status(200).json(newUsers);
// };

// export const getallUsersController = async (req: Request, res: Response) => {
//   const allUsers = await userModel.getAllUsers();
//   res.json(allUsers);
// };

// export const getUsersByIdController = async (req: Request, res: Response) => {
//   const userId = parseInt(req.params.id);

//   const getOneUsers = await userModel.getOneUser(userId);
//   if (!get) {
//     res.status(404).json({ error: "No users found " });
//   }

//   res.status(200).json(getOneUsers);
// };

// export const updateUsersController = async (req: Request, res: Response) => {
//   const usersId = parseInt(req.params.id);
//   // const product = ProductModel.getById(productId);
//   // const {name, price , description}=req.body;

//   // if (!name || !price || !description){
//   //   res.status(400).json({error:"please provide appropriate input"});
//   // }

//   const updatedUsers = await userModel.updateUserById(
//     usersId,
//     req.body
//   );

//   if (!updatedUsers) {
//     res.status(500).json({ error: "internal server error" });
//   }

//   res.json(updatedUsers);
// };

// export const deleteUsersController = async (req: Request, res: Response) => {
//   const usersId = parseInt(req.params.id);

//   const deleteUsers = await userModel.deleteUserById(usersId);
//   if (!deleteUsers) {
//     res.status(404).json({ error: "users not found" });
//   }
//   res.status(200).json(deleteUsers);
// };

///--------------------------------------------MongoDb-------------------------------------------------

import { Request, Response } from "express";
import bcrypt from "bcrypt";

import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
} from "../../models/mongodb-models/user/userServices";
import { hashPassword } from "../../utils/bcrypt";
// import { categoryModel } from "../sql-models/category.sql-models";

function validateUser(body: any) {
  if (typeof body.user_name !== "string" || !body.user_name.trim()) {
    return "name is required";
  }
  if (typeof body.user_email !== "string" || !body.user_email.trim()) {
    return "invalid email";
  }
  if (!body.user_password.trim()) {
    return "invalid password";
  }
  return null;
}

export const getAllUser = async (req: Request, res: Response) => {
  const allUsers = await getAllUsersService();
  if (!allUsers) {
    res.status(404).json({ message: "No users found" });
  }
  res.json(allUsers);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log("id=", id);
  const oneUser = await getUserByIdService(id);
  if (!oneUser) {
    res.status(404).json("no user found");
  }
  res.json(oneUser);
};

export const createUser = async (req: Request, res: Response) => {
  const { user_name, user_email, user_password } = req.body;
  const error = validateUser({ user_name, user_email, user_password });
  try {
    const hashedPassword = await hashPassword(user_password);
    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    const createdUser = await createUserService({
      user_name: user_name,
      user_email: user_email,
      user_password: hashedPassword,
    });
    console.log(createdUser);

    res.status(201).json("created user" + createdUser);
  } catch (err) {
    res.send(err);
  }
  return;
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { user_name, user_email, user_password } = req.body;
  const updatedUser = await updateUserService({
    id,
    name: user_name,
    email: user_email,
    password: user_password,
  });
  if (!updatedUser) {
    res.status(404).json({ message: "user not found" });
    return;
  }
  const error = validateUser({ ...updatedUser, ...req.body });
  if (error) {
    res.status(400).json({ message: error });
    return;
  }
  try {
    const getUserById = await getUserByIdService(id);
    res.json(getUserById);
  } catch (error) {
    res.send(error);
  }
  return;
};

export const deleteUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedUser = deleteUserService(id);
  if (!deletedUser) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).send({ message: "User deleted successfully" });
  return;
};
