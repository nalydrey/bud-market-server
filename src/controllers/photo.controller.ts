import { Request, Response } from "express";
import { PhotoService, photoService } from "../services/photo.service.js";


export class PhotoController {
    constructor(private photoService: PhotoService){}

    async create (req: Request, res: Response) {
        if(req.files && Array.isArray(req.files)){
            const files = req.files 
            const photos = await Promise.all(files.map((file) => {
                const { filename, originalname } = file
                return  this.photoService.create({fileName: filename, name: originalname})
            }) )
            
            res.status(201).json({
                photos
            })
        }
    }

}

export const photoController = new PhotoController(photoService)