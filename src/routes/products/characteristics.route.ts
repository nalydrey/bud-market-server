import {Router} from 'express'
import { productController } from '../../controllers/product.controller.js'

const router = Router()

router.get('/:type', productController.getChatacteristics.bind(productController))

export default router