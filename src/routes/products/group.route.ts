import { Router } from "express";
import { productController } from "../../controllers/product.controller.js";

const router = Router()

router.get('/', productController.getAllGroup.bind(productController))
router.get('/:groupName', productController.groupBy.bind(productController))

export default router