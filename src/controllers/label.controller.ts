import { Request, Response } from "express";
import { LabelService, labelService } from "../services/label.service.js";
import { ExtRequest } from "../models/ext-request.model.js";
import { Label } from "../entity/label.entity.js";


export class LabelController {
    constructor (private labelService: LabelService){}

    async create(req: ExtRequest, res: Response) {
        try{
            const label = await this.labelService.create(req.body)
            res.status(201).json({
                label
            })
        }
        catch(err){
            res.status(500).json({
                message: 'Помилка при створені лейби'
            })
        }
    }

    async delete(req: ExtRequest, res: Response) {
        try {
            const label = req.entity
            if(!label) throw new Error('No label')
            if(label instanceof Label) {
               await labelService.delete(label) 
               res.status(200).json({
                   label
               })
            }
        } 
        catch (error) {
            res.status(500).json({
                message: 'Помилка при видаленні лейби'
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