import { Request, Response } from "express";
import { ProductService, productService } from "../services/product.service.js";
import { CreatePhotoDto } from "../dto/photo/create-photo.dto.js";


export class ProductController {
    constructor (
        private productService: ProductService        
    ) {}

    async create (req: Request, res: Response) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        
      console.log(req.files);
      console.log(req.body);
      
        
        const product = await this.productService.create(req.body)
        res.status(201).json({
            product
        })
    }
    
    async delete (req: Request, res: Response) {
        await this.productService.delete(+req.params.id)
        res.status(200).json({
            success: true,
            message: 'Product was deleted'
        })
    }
    
    async update (req: Request, res: Response) {

    }
   
    async getOne (req: Request, res: Response) {
        const id = +req.params.id
        const product = await this.productService.getOne(id)
        res.status(200).json({
            product
        })
    }
   
    async getMany (req: Request, res: Response) {
        console.log(req.query);
        
        const products = await this.productService.getMany(req.query)

        res.status(200).json({
            products
        })
    }

    
}

export const productController = new ProductController(productService)