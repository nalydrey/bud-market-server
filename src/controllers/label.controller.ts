import { Request, Response } from "express";
import { LabelService, labelService } from "../services/label.service.js";


export class LabelController {
    constructor (private labelService: LabelService){}

    async create(req: Request, res: Response) {
        const label = await this.labelService.create(req.body)
        res.status(201).json({
            label
        })
    }

    async delete(req: Request, res: Response) {
        try {
            const id = +req.params.id
            await labelService.delete(id)
            res.status(200).json({
                success: true,
                message: 'Label was deleted'
            })
        } 
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Label was not deleted'
            })
        }
        

    }

    async update(req: Request, res: Response) {
        const id = +req.params.id
        const {name, color} = req.body
        const label = await this.labelService.update({id, color, name})
        res.status(200).json({
            label
        })
    }

    async getMany(req: Request, res: Response) {
        const labels = await this.labelService.getMany()
        res.status(200).json({
            labels
        })
    }

    async getOne(req: Request, res: Response) {
        const label = await this.labelService.getOne(+req.params.id)
        res.status(200).json({
            label
        })
    }
} 

export const labelController = new LabelController(labelService) 