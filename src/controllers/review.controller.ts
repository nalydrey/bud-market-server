import { Request, Response } from "express";
import { ReviewService, reviewService } from "../services/review.service.js";
import { CreateReviewDto } from "../dto/review/create-review.dto.js";
import { ProductService, productService } from "../services/product.service.js";


export class ReviewController {

    constructor(private reviewService: ReviewService, private productService: ProductService){}

    async create(req: Request, res: Response){
        const createDto: CreateReviewDto = req.body
        const { productId, text, userName, value } = createDto
        const product = await this.productService.getOne(productId)
        if(product){
            const review = await this.reviewService.create({product, text, userName, value})
            res.status(201).json({
                review
            })
        }
    }
   
    async getMany(req: Request, res: Response){
        res.status(200).json({
            reviews
        })
    }
}

export const reviewController = new ReviewController(reviewService, productService)