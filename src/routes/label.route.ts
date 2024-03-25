import { Router } from "express";
import { labelController } from "../controllers/label.controller.js";
import { validateAndTransform } from "../middlewares/validator.js";
import { CreateLabelDto } from "../dto/label/create-label.dto.js";
import { alreadyExist } from "../middlewares/alreadyExist.js";
import { Label } from "../entity/label.entity.js";
import { ParamsDto } from "../dto/params/brand-params.dto.js";

export const labelRouter = Router()

labelRouter.get('/', labelController.getMany.bind(labelController))
labelRouter.get('/:id', labelController.getOne.bind(labelController))

labelRouter.post('/', 
    validateAndTransform(CreateLabelDto),
    alreadyExist(Label, 'name'),
    labelController.create.bind(labelController)
)

labelRouter.delete('/:id',
    validateAndTransform(ParamsDto, 'params'),
    alreadyExist(Label, 'id', {dir: true, from: 'params'}),   
    labelController.delete.bind(labelController)
)

labelRouter.put('/:id', labelController.update.bind(labelController))

