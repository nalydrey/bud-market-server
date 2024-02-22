import { Router } from 'express'

import multer from 'multer'
import path from 'path';
import { brandController } from '../controllers/brand.controller.js';



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${process.cwd()}/uploads`)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })


export const brandRouter = Router()

brandRouter.post('/', upload.any(), brandController.create.bind(brandController))

brandRouter.put('/:id', upload.any(), brandController.edit.bind(brandController))

brandRouter.delete('/:id', brandController.delete.bind(brandController))

brandRouter.get('/:id', brandController.getOne.bind(brandController))

brandRouter.get('/', brandController.getMany.bind(brandController))