import { Router } from "express";
import { productController } from "../controllers/product.controller.js";
import { validateAndTransform } from "../middlewares/validator.js";
import { CreateProductDto } from "../dto/product/create-product.dto.js";
import multer from "multer";
import path from "path";
import { alreadyExist } from "../middlewares/alreadyExist.js";
import { Product } from "../entity/product.entity.js";
import { ProductQueryDto } from "../dto/product/product-query.dto.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${process.cwd()}/uploads`)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

  const upload = multer({ storage: storage })

export const productRouter = Router()

productRouter.get('/', 
  validateAndTransform(ProductQueryDto, 'query'),
  productController.getMany.bind(productController)
)
productRouter.get('/:id',  productController.getOne.bind(productController))
productRouter.post('/',
    upload.array('file'),
    validateAndTransform(CreateProductDto),
    alreadyExist(Product, 'title'),
    productController.create.bind(productController),
)
productRouter.delete('/:id', productController.delete.bind(productController))
