
import express from 'express'
import { createUser, deleteUserById, getAllUser, getUserById, updateUser } from '../controller/auth-Controllers.ts/signUp-Controller';
import { authMiddleware } from '../utils/auth-middleware';
import { LoginController } from '../controller/auth-Controllers.ts/login-Controllers';
import { logoutController } from '../controller/auth-Controllers.ts/logOut-Controllers';

const userRouter= express.Router();
userRouter.get("/", getAllUser);
userRouter.get('/:id', getUserById);
userRouter.post('/signup', createUser);
userRouter.post('/login', LoginController);
userRouter.post('/logout',authMiddleware, logoutController);

userRouter.delete('/:id', deleteUserById);
userRouter.put('/:id', updateUser);

export {userRouter};