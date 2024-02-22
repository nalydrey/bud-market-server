import { Router } from "express";
import { categoryController } from "../controllers/category.controller.js";
import multer from "multer";
import path from "path";

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

categoryRouter.post('/',upload.single('file'), categoryController.create.bind(categoryController))
categoryRouter.get('/tree', categoryController.getTree.bind(categoryController))
categoryRouter.get('/tree/:name', categoryController.getDescendantsTree.bind(categoryController))
categoryRouter.get('/array/:name', categoryController.getAncestors.bind(categoryController))
categoryRouter.get('/many', categoryController.getMany.bind(categoryController))
categoryRouter.delete('/:id', categoryController.delete.bind(categoryController))
categoryRouter.put('/:id', categoryController.update.bind(categoryController))

