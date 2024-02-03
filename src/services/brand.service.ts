import { myDataSource } from "../data-source/data-source.init.js";
import { CreateBrandDto } from "../dto/create-brand.dto.js";
import { EditBrandDto } from "../dto/edit-brand.dto.js";
import { Brand } from "../entity/brand.entity.js";


const repo = myDataSource.getRepository(Brand)

export class BrandService {

    create(brandDto: CreateBrandDto){
        const newBrand = new Brand()

        newBrand.logoImg = brandDto.fileName
        newBrand.name = brandDto.name

        return repo.save(newBrand)
    }

    delete(id: number){
        return repo.delete(id)
    }

    async edit(editBrandDto: EditBrandDto){
        console.log(editBrandDto);
        
        const {id, fileName, name} = editBrandDto
        const brand = await repo.findOneBy({id})
        if(brand){
            if(fileName) brand.logoImg = fileName
            if(name) brand.name = name
            return repo.save(brand)
        }
        return brand
    }

    getMany(){
        return repo.find()
    }

    getOne(id: number){
        return repo.findOneBy({id})
    }
}

export const brandService = new BrandService()