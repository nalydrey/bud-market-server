import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { validateAndTransform } from "../middlewares/validator.js";
import { RegisterUserDto } from "../dto/user/register-user.dto.js";
import { alreadyExist } from "../middlewares/alreadyExist.js";
import { User } from "../entity/user.entity.js";
import { LoginDto } from "../dto/user/login0user.dto.js";
import passport from "passport";
import { userService } from "../services/user.service.js";

export const userRouter = Router()

userRouter.get('/', userController.getMany.bind(userController))
userRouter.get('/login/', 
validateAndTransform(LoginDto, 'query'),
alreadyExist(User, 'email', {dir: true}),
userController.login.bind(userController)
)
userRouter.post('/register',
    validateAndTransform(RegisterUserDto),
    alreadyExist(User, 'email'),
    userController.register.bind(userController)
)

userRouter.get('/enter',
    passport.authenticate('jwt', { session: false }),
    userController.enter.bind(userController)
)
userRouter.put('/favorite', 
    passport.authenticate('jwt', {session: false}),
    userController.changeFavourite.bind(userController),

)
userRouter.put('/compare', 
    passport.authenticate('jwt', {session: false}),
    userController.changeCompare.bind(userController),

)
userRouter.put('/:id', userController.update.bind(userController))
userRouter.delete('/:id', userController.delete.bind(userController))
