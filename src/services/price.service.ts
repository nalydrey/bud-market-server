import { myDataSource } from "../data-source/data-source.init.js";
import { CreatePriceDto } from "../dto/price/create-price.dto.js";
import { Price } from "../entity/price.entity.js";

const repo = myDataSource.getRepository(Price)

export class PriceService {
    create(createDto: CreatePriceDto) {
        console.log('!', createDto);
        
        const {value} = createDto
        const price = new Price()
        price.value = value
        return repo.save(price)
    }

    update() {

    }

    delete () {

    }

    getOne() {

    }

    getMany() {
        // return repo.find
    }
}

export const priceService = new PriceService()