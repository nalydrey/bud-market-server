import { myDataSource } from "../data-source/data-source.init.js"
import { CreateReviewDto } from "../dto/review/create-review.dto.js"
import { Product } from "../entity/product.entity.js"
import { Review } from "../entity/review.entity.js"

type CreateReviewData = Omit<CreateReviewDto, 'productId'> & {product: Product}

const repo = myDataSource.getRepository(Review)

export class ReviewService {

    create(reviewDto: CreateReviewData) {
        const review = new Review()
        Object.assign(review, reviewDto)
        return repo.save(review)
    }

}

export const reviewService = new ReviewService()