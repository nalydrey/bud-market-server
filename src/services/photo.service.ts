import { In } from "typeorm";
import { myDataSource } from "../data-source/data-source.init.js";
import { CreatePhotoDto } from "../dto/photo/create-photo.dto.js";
import { Photo } from "../entity/photo.entity.js";

const repo = myDataSource.getRepository(Photo)

export class PhotoService {
    create (createDto: CreatePhotoDto) {
        const {name, fileName} = createDto
        const photo = new Photo()
        photo.name = name
        photo.fileName = fileName
        return repo.save(photo)
    }

    delete (id: number) {
        return repo.delete(id)
    }
    
    update () {

    }
    
    getOne (id: number) {
        return repo.findOneBy({id})
    }
    
    getMany () {
        return repo.find()
    }

    getManyByIds (id: number[]) {
        return repo.findBy({id: In(id)})
    }
}

export const photoService = new PhotoService()