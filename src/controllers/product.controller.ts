import { Request, Response } from "express";
import { ProductService, productService } from "../services/product.service.js";
import { LabelService, labelService } from "../services/label.service.js";
import { CreateProductDto } from "../dto/product/create-product.dto.js";
import { PriceService, priceService } from "../services/price.service.js";
import { BrandService, brandService } from "../services/brand.service.js";
import { CategoryService, categoryService } from "../services/category.service.js";
import { CharacteristicService, characteristicService } from "../services/characteristic.service.js";
import { PhotoService, photoService } from "../services/photo.service.js";

export class ProductController {
    constructor (
        private productService: ProductService,  
        private labelService: LabelService,     
        private priceService: PriceService,      
        private brandService: BrandService, 
        private categoryService: CategoryService, 
        private characteristicService: CharacteristicService,
        private photoSetvice: PhotoService    
    ) {}

    async create (req: Request, res: Response) {
        console.log(req.body);
        
        try{
          const {title, model, name, status, discription, labelId, brandId, categoryId, price, characteristics} = req.body as CreateProductDto
            
            const label = labelId ? await this.labelService.getOne(labelId) : null
            const priceHistory = await this.priceService.create({value: price})
            const brand = await this.brandService.getOne(brandId)
            const category = await this.categoryService.getOne(categoryId)
            const characteristicArr = characteristics && await Promise.all(characteristics.map(item => this.characteristicService.create(item))) 
            const files = req.files as Express.Multer.File[]
            const images = await Promise.all(files.map(file => this.photoSetvice.create({fileName: file.filename, name: file.originalname})))

            if(brand && category){
                const product = await this.productService.create({
                    title,
                    model,
                    name,
                    status,
                    discription,
                    priceHistory: [priceHistory],
                    brand, 
                    category,
                    characteristics: characteristicArr,
                    images,
                    label
                })
                res.status(201).json({
                    product
                })
            }
            else{
                throw new Error('brand or category does not exist')
            }
        }
        catch(err){
            res.status(500).json({
                message: 'Продукт не створено'
            })
        }
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
        
        const [products, qty] = await this.productService.getMany(req.query)
        
        res.status(200).json({
            products,
            qty
        })
    }

    
}

export const productController = new ProductController(
    productService, 
    labelService,
    priceService,
    brandService,
    categoryService,
    characteristicService,
    photoService
)   