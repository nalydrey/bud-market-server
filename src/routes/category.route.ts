import { Router } from "express";
import { categoryController } from "../controllers/category.controller.js";
import multer from "multer";
import path from "path";
import { validateAndTransform } from "../middlewares/validator.js";
import { CreateCategoryDto } from "../dto/category/create-category.dto.js";
import { ParamsDto } from "../dto/params/brand-params.dto.js";
import { alreadyExist } from "../middlewares/alreadyExist.js";
import { Category } from "../entity/category.entity.js";

export const categoryRouter = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${process.cwd()}/uploads`)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })

categoryRouter.post('/',
upload.single('file'),
validateAndTransform(CreateCategoryDto),
categoryController.create.bind(categoryController)
)
categoryRouter.get('/tree', categoryController.getTree.bind(categoryController))
categoryRouter.get('/tree/:name', categoryController.getDescendantsTree.bind(categoryController))
categoryRouter.get('/array/:name', categoryController.getAncestors.bind(categoryController))
categoryRouter.get('/many', categoryController.getMany.bind(categoryController))
categoryRouter.delete('/:id',
  validateAndTransform(ParamsDto, 'params'),
  alreadyExist(Category, 'id', {dir: true}),
  categoryController.delete.bind(categoryController),
)
categoryRouter.put('/:id', categoryController.update.bind(categoryController))

