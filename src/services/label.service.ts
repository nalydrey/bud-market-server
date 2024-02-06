import { myDataSource } from "../data-source/data-source.init.js";
import { CreateLabelDto } from "../dto/create-label.dto.js";
import { EditLabelDto } from "../dto/edit-label.dto.js";
import { Label } from "../entity/label.entity.js";

const repo = myDataSource.getRepository(Label)

export class LabelService {
    create(createDto: CreateLabelDto) {
        const label = new Label()
        label.name = createDto.name
        label.color = createDto.color
        return repo.save(label)
    }

    delete(id: number) {
        return repo.delete(id)
    }

    async update(editDto: EditLabelDto) {
        const {id, color, name} = editDto
        const label = await repo.findOneBy({id})
        if(label){
            if(color)label.color = color
            if(name)label.name = name
            return repo.save(label)
        }
        return label
    }

    getOne(id: number) {
        return repo.findOneBy({id})
    }

    getMany() {
        return repo.find()
    }
}

export const labelService = new LabelService()