import { Router } from "express";
import { productController } from "../../controllers/product.controller.js";
import {validateAndTransform} from '../../middlewares/validator.js'
import { CreateProductDto } from "../../dto/create-product.dto.js";
const route = Router()

route.get('/',  productController.getProducts.bind(productController))
route.post(
    '/', 
    validateAndTransform(CreateProductDto),
    productController.createProduct.bind(productController)
)
route.delete('/:id', productController.deleteProduct.bind(productController))

export default route