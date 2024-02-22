import { Between, In } from "typeorm";
import { myDataSource } from "../data-source/data-source.init.js";
import { CreateProductDto } from "../dto/product/create-product.dto.js";
import { ProductQueryDto } from "../dto/product/product-query.dto.js";
import { Product } from "../entity/product.entity.js";
import { BrandService, brandService } from "./brand.service.js";
import { CategoryService, categoryService } from "./category.service.js";
import { CharacteristicService, characteristicService } from "./characteristic.service.js";
import { LabelService, labelService } from "./label.service.js";
import { PhotoService, photoService } from "./photo.service.js";
import { PriceService, priceService } from "./price.service.js";


const repo = myDataSource.getRepository(Product)

export class ProductService {

    constructor (
        private brandService: BrandService,
        private categoryService: CategoryService,
        private characteristicService: CharacteristicService,
        private labelService: LabelService,
        private photoService: PhotoService,
        private priceService: PriceService

     ) {

    }

    async create (createProductDto: CreateProductDto) {
        console.log(createProductDto);
        
        const {brandId, categoryId, characteristics, discription, images, labelId, model, name, price, status, title} = createProductDto
        const product = new Product()
        product.title = title
        product.status = status
        product.name = name
        product.model = model
        product.discription = discription
        console.log(price);
        
        const brand = await this.brandService.getOne(brandId)
        const category = await this.categoryService.getOne(categoryId)
        const label = await this.labelService.getOne(labelId)
        const newPrice = await this.priceService.create({value: price})
        const photos = await this.photoService.getManyByIds(images)
        const characteristicsArr = await Promise.all(characteristics.map(characteristic => this.characteristicService.create(characteristic)))

        product.priceHistory = [newPrice]
        product.characteristics = characteristicsArr
        product.images = photos
        if(brand) product.brand = brand
        if(category) product.category = category
        if(label) product.label = label

        return repo.save(product)
    }

    async delete (id: number) {
        return repo.delete(id)
    }
    
    update () {

    }
    
    getOne () {

    }
    
    getMany (query: ProductQueryDto) {
        const {limit, page, filter } = query
        console.log('product filter');
        
        console.log(filter);
        
        let skip = 0
        if(page && limit) skip = page*limit 

        return repo.find({
            where: {
                category: {
                    systemName: filter && filter.category && filter.category.systemName
                },
                brand: {
                    id: filter && filter.brand && filter.brand.id && In(filter.brand.id)
                },
                // brand:  filter && filter.brand && filter.brand.id && In(filter.brand.id),
                priceHistory: filter && filter.price && [{value: Between(filter.price[0], filter.price[1])}]
            },
            take: limit,
            skip
        })
    }
}

export const productService = new ProductService(
    brandService, categoryService, characteristicService, labelService, photoService, priceService
)