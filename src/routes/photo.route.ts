import { Router } from "express";
import multer from "multer";
import path from "path";
import { photoController } from "../controllers/photo.controller.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${process.cwd()}/uploads`)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })

export const photoRouter = Router()

photoRouter.post('/', upload.array('file'), photoController.create.bind(photoController))
