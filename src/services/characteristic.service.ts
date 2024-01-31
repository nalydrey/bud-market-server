import { myDataSource } from "../data-source/data-source.init.js";
import { CreateCharacteristicDto } from "../dto/create-characteristic.dto.js";
import { IFilter } from "../dto/query.dto.js";
import { Characteristic } from "../entity/characteristics.entity.js";


export class CharacteristicService {

    readonly repo = myDataSource.getRepository(Characteristic)

    async findByFilter (filter: IFilter[]) {
        return this.repo.find({
            where: filter,
            relations: {
                product: true
            }
        })
    }

    createNewCharacreristics (characteristicDto: CreateCharacteristicDto[]) {
        const characteristicArr = characteristicDto.map(characteristic => {
            const newCharacteristic = new Characteristic()
            Object.assign(newCharacteristic, characteristic) 
            return newCharacteristic
        })
        return this.repo.save(characteristicArr)
    }

    deleteCharacteristic () {

    }

    editCharacteristic () {

    }

    async getCharacteristicsByType (type: string) {
        
        return this.repo
            .createQueryBuilder('characteristic')
            .leftJoinAndSelect('characteristic.product', 'product')
            .select('characteristic.value', 'value')
            .addSelect('characteristic.name', 'name')
            .addSelect('characteristic.unit', 'unit')
            .where('product.type = :type', {type} )
            .groupBy('characteristic.name')
            .addGroupBy('characteristic.value')
            .addGroupBy('characteristic.unit')
            .getRawMany()
    }
}

export const characteristicService = new CharacteristicService()