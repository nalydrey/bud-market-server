import { Router } from "express";
import { reviewController } from "../controllers/review.controller.js";


export const reviewRouter = Router()

reviewRouter.post('/', reviewController.create.bind(reviewController))
