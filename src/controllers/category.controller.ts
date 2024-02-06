import { Request, Response } from "express";
import { CategoryService, categoryService } from "../services/category.service.js";


export class CategoryController {
    constructor(private categoryService: CategoryService){}

    async create (req: Request, res: Response) {
        const category = await this.categoryService.create(req.body)
        res.status(201).json({
            category
        })
    }
    
    async delete (req: Request, res: Response) {
        await this.categoryService.delete(+req.params.id)
        res.status(200).json({
            success: true
        })
    }
    
    async update (req: Request, res: Response) {
        console.log(req.body);
        
        const id = +req.params.id
        const {parentId, name} = req.body
        const category = await this.categoryService.update({id, name, parentId})
        res.status(200).json({
            category
        })
    }
    
    async getOne (req: Request, res: Response) {

    }
    
    async getMany (req: Request, res: Response) {
        const categories = await this.categoryService.getMany()
        res.status(200).json({
            categories
        })
    }
}

export const categoryController = new CategoryController(categoryService)