import { Router } from "express";
import { labelController } from "../../controllers/label.controller.js";

export const labelRouter = Router()

labelRouter.get('/', labelController.getMany.bind(labelController))
labelRouter.get('/:id', labelController.getOne.bind(labelController))
labelRouter.post('/', labelController.create.bind(labelController))
labelRouter.delete('/:id', labelController.delete.bind(labelController))
labelRouter.put('/:id', labelController.update.bind(labelController))

