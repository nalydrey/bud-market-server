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

    async getGroup (categorySystemName: string) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        const a =await repo
            .createQueryBuilder('characteristic')
            .select('characteristic.name', 'name')
            .addSelect('characteristic.value', 'value')
            .addSelect('characteristic.unit', 'unit')
            .leftJoin('characteristic.product', 'product')
            .leftJoin('product.category', 'category')
            .where('category.systemName = :categorySystemName', {categorySystemName})
            .groupBy('characteristic.name')
            .addGroupBy('characteristic.value')
            .addGroupBy('characteristic.unit')
            .getRawMany()
            
            
            console.log(a);
            return a
    }
}

export const characteristicService = new CharacteristicService()