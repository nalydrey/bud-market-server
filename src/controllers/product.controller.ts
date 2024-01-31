import {Request, Response } from 'express'
import { ProductService, productService } from '../services/product.service.js'
import { CharacteristicService, characteristicService } from '../services/characteristic.service.js';

class ProductController {

    constructor(private productService: ProductService, private characteristicService: CharacteristicService) {
        
    }

    async getProducts(req: Request, res: Response){
        const queryObj = req.query
        console.log(queryObj);
        
        
        const products = await productService.getProducts(queryObj)
        res.status(200).json({
            products
        })
    }

    async createProduct(req: Request, res: Response){
        const createProductDto = req.body 
        
        const product = await this.productService.createProduct(createProductDto)
        res.status(201).json({
            product
        })
    }
  
    async deleteProduct(req: Request, res: Response){
        const productId = +req.params.id
        const product = await this.productService.deleteProduct(productId)
        res.status(201).json({
            product
        })
    }

    async getAllGroup(req: Request, res: Response){
        const groups = await productService.getAllGroup()
        res.status(200).json({
            groups
        })
    }

    async groupBy (req: Request, res: Response) {
        const {groupName} = req.params
        const groups = await this.productService.getTypeListByCategory(groupName)
        res.status(200).json({
            groups
        })
    }

    async getChatacteristics (req: Request, res: Response) {
        const type = req.params.type
        
        const groups  = await this.characteristicService.getCharacteristicsByType(type)
        res.status(200).json({
            groups
        })
    }



}

export const  productController = new ProductController(productService, characteristicService)