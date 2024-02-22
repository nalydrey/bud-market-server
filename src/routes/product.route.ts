import { Router } from "express";
import { productController } from "../controllers/product.controller.js";

export const productRouter = Router()

productRouter.get('/',  productController.getMany.bind(productController))
productRouter.post('/', productController.create.bind(productController))
productRouter.delete('/:id', productController.delete.bind(productController))
