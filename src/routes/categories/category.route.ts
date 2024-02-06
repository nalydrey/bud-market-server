import { Router } from "express";
import { categoryController } from "../../controllers/category.controller.js";

export const categoryRouter = Router()

categoryRouter.post('/', categoryController.create.bind(categoryController))
categoryRouter.get('/', categoryController.getMany.bind(categoryController))
categoryRouter.delete('/:id', categoryController.delete.bind(categoryController))
categoryRouter.put('/:id', categoryController.update.bind(categoryController))

