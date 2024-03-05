import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

export const userRouter = Router()

userRouter.get('/', userController.getMany.bind(userController))
userRouter.get('/login/', userController.login.bind(userController))
userRouter.post('/register', userController.register.bind(userController))
userRouter.put('/favorite', userController.changeFavourite.bind(userController))
userRouter.put('/compare', userController.changeCompare.bind(userController))
userRouter.put('/:id', userController.update.bind(userController))
userRouter.delete('/:id', userController.delete.bind(userController))
