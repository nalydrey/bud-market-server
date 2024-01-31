import { myDataSource } from "../data-source/data-source.init.js";
import { Product } from "../entity/product.entity.js";
import { CreateProductDto } from "../dto/create-product.dto.js";
import { QueryDto } from "../dto/query.dto.js";
import {In } from "typeorm";
import { CharacteristicService, characteristicService } from "./characteristic.service.js";

const productRepo = myDataSource.getRepository(Product)


const getValueOrArr = (value?: string | string[]) => {
    if(typeof value === 'string'){
        return value
    }
    if(Array.isArray(value)){
        return In(value)
    }
}

export class ProductService {

    constructor(private characteristicService: CharacteristicService){}

    async getProducts(queryObject: QueryDto){
            const {category, type} = queryObject
            const ids: number[] = await this.getProductIdsByCharacteristics(queryObject.filter)
            
            return productRepo.find({
                where: {
                    id: ids.length ? In(ids) : undefined ,
                    category:  category,
                    type:  type,
                },
            })
    }

    async createProduct(createProductDto: CreateProductDto) {
        const characteristics = await this.characteristicService.createNewCharacreristics(createProductDto.characteristics)
        const product = new Product()
        Object.assign(product, createProductDto, {characteristics})
        return productRepo.save(product)
    }

    async deleteProduct(productId: number){
       const product = await this.getProductById(productId)
       await productRepo.delete(productId)
       return product
    }

    getProductById(productId: number){
        return productRepo.findOneBy({id: productId})
    }

    async getAllGroup(){
        return productRepo
        .createQueryBuilder('product')
        .select('product.category', 'category')
        .addSelect('product.type', 'type')
        .addSelect('COUNT(*)', 'total')
        .groupBy('product.category')
        .addGroupBy('product.type')
        .getRawMany()
    }

    async getTypeListByCategory(groupName: string){
        return productRepo
            .createQueryBuilder('product')
            .select('product.type', 'type')
            .where('product.category = :groupName', {groupName})
            .addSelect('COUNT(*)', 'total')
            .groupBy('product.type')
            .getRawMany()
    }

    async getProductIdsByCharacteristics(characteristicFilter: QueryDto['filter']) {
        if(characteristicFilter){
            const setSize = new Set(characteristicFilter.map(elem => elem.name)).size
            const characteristics = await characteristicService.findByFilter(characteristicFilter)
    
            const productIds = await characteristicService.repo
            .createQueryBuilder('characteristics')
            .leftJoinAndSelect('characteristics.product', 'product')
            .select('product.id', 'productId')
            .addSelect('COUNT(*)', 'total')
            .where('characteristics.id IN(:...ids)', {ids: characteristics.map(elem => elem.id)})
            .having('total = :number', {number: setSize})
            .groupBy('product.id')
            .getRawMany<{productId: number, total: number}>()
            return productIds.map(elem => elem.productId)
        }
        return []
    }

    
}

export const productService: ProductService = new ProductService(characteristicService)