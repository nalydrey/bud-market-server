
import { Router } from "express";
import { characteristicController } from "../controllers/characteristic.controller.js";

export const characteristicRouter = Router()

characteristicRouter.get('/many', characteristicController.getMany.bind(characteristicController))
characteristicRouter.get('/group/:categorySystemName', characteristicController.getGroup.bind(characteristicController))