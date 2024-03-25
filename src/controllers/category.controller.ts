import { Request, Response } from "express";
import { CategoryService, categoryService } from "../services/category.service.js";
import { PhotoService, photoService } from "../services/photo.service.js";
import { ExtRequest } from "../models/ext-request.model.js";
import { CreateCategoryDto } from "../dto/category/create-category.dto.js";
import { Category } from "../entity/category.entity.js";


export class CategoryController {
    constructor(private categoryService: CategoryService, private photoService: PhotoService){}

    async create (req: ExtRequest, res: Response) {
        const createDto = req.body as CreateCategoryDto
        try{
            let photo = null
            if(req.file){
                const {filename, originalname} = req.file
                photo = await this.photoService.create({fileName: filename, name: originalname})
            }
            const category = await this.categoryService.create({...createDto, photo})
            res.status(201).json({
                category
            })
        }
        catch(err){
            res.status(500).json({
                message: 'Помилка при створенні категорії'
            })
        }
    }
    
    async delete (req: ExtRequest, res: Response) {
        try{
            const category = req.entity
            if(!category) throw new Error('No category')
            if(category instanceof Category){
                await this.categoryService.delete(category)
            }
            res.status(200).json({
                category
            })
        }
        catch{
            res.status(500).json({
                message: 'Помилка при видаленні категорії'
            })
        }
    }
    
    async update (req: Request, res: Response) {
        const id = +req.params.id
        const {parentId, name} = req.body
        const category = await this.categoryService.update({id, name, parentId})
        res.status(200).json({
            category
        })
    }
    
    async getOne (req: Request, res: Response) {

    }
    
    async getTree (req: Request, res: Response) {
        const categories = await this.categoryService.getTree()
        res.status(200).json({
            categories
        })
    }
   
    async getMany (req: Request, res: Response) {
        const categories = await this.categoryService.getMany(req.query)
        res.status(200).json({
            categories
        })
    }

    async getDescendantsTree (req: Request, res: Response) {
        const name = req.params.name
        const category = await this.categoryService.getDescendantsTree(name)
        res.status(200).json({
            category
        })
    }

    async getAncestors (req: Request, res: Response) {
        const name = req.params.name
        const categories = await this.categoryService.getAncestors(name)
        res.status(200).json({
            categories
        })
    }
}

export const categoryController = new CategoryController(categoryService, photoService)