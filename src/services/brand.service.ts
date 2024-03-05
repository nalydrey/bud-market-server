import { myDataSource } from "../data-source/data-source.init.js";
import { CreateBrandDto } from "../dto/brand/create-brand.dto.js";
import { EditBrandDto } from "../dto/brand/edit-brand.dto.js";
import { QueryBrandDto } from "../dto/brand/query-brand.dto.js";
import { Brand } from "../entity/brand.entity.js";

type CreateBrandData = CreateBrandDto & {fileName: string | null}

const repo = myDataSource.getRepository(Brand)

export class BrandService {

    create(createData: CreateBrandData){
        const {fileName, name} = createData
        const newBrand = new Brand()

        if(fileName) newBrand.logoImg = fileName
        newBrand.name = name

        return repo.save(newBrand)
    }

    delete(id: number){
        return repo.delete(id)
    }

    async edit(editBrandDto: EditBrandDto){
        
        const {id, fileName, name} = editBrandDto
        const brand = await repo.findOneBy({id})
        if(brand){
            if(fileName) brand.logoImg = fileName
            if(name) brand.name = name
            return repo.save(brand)
        }
        return brand
    }

    getMany(query: QueryBrandDto){
        console.log(query);
        
        return repo.find({
            where: {
                ...query.filter
            }
        })
    }

    getOne(id: number){
        return repo.findOneBy({id})
    }
}

export const brandService = new BrandService()