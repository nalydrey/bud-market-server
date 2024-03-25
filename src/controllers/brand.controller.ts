import { Request, Response } from "express";
import { BrandService, brandService } from "../services/brand.service.js";
import { FileService, fileService } from "../services/file.service.js";
import { ExtRequest } from "../models/ext-request.model.js";
import { Brand } from "../entity/brand.entity.js";

export class BrandController {

    constructor(
        private brandService: BrandService,
        private fileService: FileService
    ){}

    async create(req: Request, res: Response){
        const fileName = req.file ? req.file.filename : null
        try{
            const brand = await this.brandService.create({name: req.body.name, fileName})
            res.status(201).json({
                brand
            })
        }
        catch(err){
            fileName && this.fileService.delete(fileName)
            res.status(500).json({
                message: 'Бренд не було створений'
            })
        }
    }

    async delete(req: ExtRequest, res: Response){
        try{
            const brand = req.entity
            if(!brand) throw new Error('note was not found')
            if(brand instanceof Brand){
                const fileName = brand.logoImg?.split('/').pop()
                fileName &&
                await this.fileService.delete(fileName)
                await this.brandService.delete(brand)
                res.status(200).json({
                    brand
                })
            } 
        }
        catch(err){
            res.status(500).json({
                success: false,
                message: 'Бренд не був видалений'
            })
        }
    }

    async edit(req: Request, res: Response){
        const {name} = req.body
        const files = req.files as Express.Multer.File[]
        const fileName = files.length > 0 ? files[0].filename : undefined
        
        const id = +req.params.id
        try{
            const oldBrand = await this.brandService.getOne(id)
            const brand = await this.brandService.edit({id, name, fileName})
            fileName && oldBrand && await this.fileService.delete(oldBrand.logoImg)
            res.status(200).json({
                brand
            })
        }
        catch(err){
            res.status(500).json({
                message: 'Brand was not edited'
            })
        }
    }

    async getOne(req: ExtRequest, res: Response){
        const brand = req.entity
        try{
            if(!brand) throw new Error('No brand')
            if(brand instanceof Brand){
                res.status(200).json({
                    brand
                })
            }
        }
        catch(err){
            res.status(500).json({
                message: 'Бренд не завантажений'
            })
        }
    }

    async getMany(req: Request, res: Response){
        try{
            const brands = await this.brandService.getMany(req.query)
            res.status(200).json({
                brands
            })
        }
        catch(err){
            res.status(500).json({
                message: 'Error when find brands'
            })
        }
    }
}

export const brandController = new BrandController(brandService, fileService)