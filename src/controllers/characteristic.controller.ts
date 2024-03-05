import { Request, Response } from "express";
import { CharacteristicService, characteristicService } from "../services/characteristic.service.js";

export class CharacteristicController {

    constructor(private characteristicService: CharacteristicService) {}

    create(req: Request, res: Response) {

    }

    async getMany(req: Request, res: Response) {
        const characteristics = await this.characteristicService.getMany()
        res.status(200).json({
            characteristics
        })
    }

    async getGroup(req: Request, res: Response) {
        const categorySystemName = req.params.categorySystemName
        const characteristicGroups = await this.characteristicService.getGroup(categorySystemName)
        res.status(200).json({
            characteristicGroups
        })
    }
}

export const characteristicController = new CharacteristicController(characteristicService)