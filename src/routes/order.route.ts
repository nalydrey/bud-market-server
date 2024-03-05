import { Router } from "express";
import { orderController } from "../controllers/order.controller.js";

export const orderRouter = Router()

orderRouter.get('/', orderController.getMany.bind(orderController))

orderRouter.post('/', orderController.create.bind(orderController))