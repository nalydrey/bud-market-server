import { myDataSource } from "../data-source/data-source.init.js";
import { CreateCharacteristicsDto } from "../dto/characteristic/create-characteristics.dto.js";
import { EditCharacteristicsDto } from "../dto/characteristic/edit-characteristic.dto.js";
import { Characteristic } from "../entity/characteristics.entity.js";

const repo = myDataSource.getRepository(Characteristic)

export class CharacteristicService {
    create (createDto: CreateCharacteristicsDto) {
        const { name, unit, value } = createDto
        const characteristic = new Characteristic()
        characteristic.name = name
        characteristic.unit = unit
        characteristic.value = value
        return repo.save(characteristic)
    }

    delete (id: number) {
        return repo.delete(id)
    }
    
    async update (editDto: EditCharacteristicsDto) {
        const { id, name, unit, value } = editDto
        const characteristic = await repo.findOneBy({id})
        if(characteristic){
            if(name) characteristic.name = name
            if(unit) characteristic.unit = unit
            if(value) characteristic.value = value
            return repo.save(characteristic)
        }
        return null
    }
    
    getOne (id: number) {
        return repo.findOneBy({id})
    }
    
    getMany () {
        return repo.find()
    }
}

export const characteristicService = new CharacteristicService()