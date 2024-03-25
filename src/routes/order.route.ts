import { Router } from "express";
import { orderController } from "../controllers/order.controller.js";
import { validateAndTransform } from "../middlewares/validator.js";
import { CreateOrderDto } from "../dto/order/create-order.dto.js";
import { GetOrderDto } from "../dto/order/get-order-dto.js";
import { EditOrderDto } from "../dto/order/edit-order.dto.js";
import { ParamsDto } from "../dto/params/brand-params.dto.js";
import passport from "passport";

export const orderRouter = Router()

orderRouter.get('/', 
    validateAndTransform(GetOrderDto),
    orderController.getMany.bind(orderController)
)

orderRouter.post('/user', 
    passport.authenticate('jwt', {session: false}),
    validateAndTransform(CreateOrderDto),
    orderController.create.bind(orderController)
)

orderRouter.post('/', 
    validateAndTransform(CreateOrderDto),
    orderController.create.bind(orderController)
)

orderRouter.put('/:id', 
    validateAndTransform(ParamsDto, 'params'),
    validateAndTransform(EditOrderDto),
    orderController.edit.bind(orderController)
)

orderRouter.delete('/:id', 
    validateAndTransform(ParamsDto, 'params'),
    orderController.delete.bind(orderController)
)