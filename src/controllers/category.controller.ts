import { Request, Response } from "express";
import { CategoryService, categoryService } from "../services/category.service.js";
import { PhotoService, photoService } from "../services/photo.service.js";


export class CategoryController {
    constructor(private categoryService: CategoryService, private photoService: PhotoService){}

    async create (req: Request, res: Response) {
        let category = null
        if(req.file){
            const {filename, originalname} = req.file
            const photo = await this.photoService.create({fileName: filename, name: originalname})
            category = await this.categoryService.create(req.body, photo)
        }
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
    
    async getTree (req: Request, res: Response) {
        console.log('!');
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
        console.log('!!');
        console.log(req.params.name);
        
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