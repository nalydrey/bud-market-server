import {  Any, Between, ILike, In } from "typeorm";
import { myDataSource } from "../data-source/data-source.init.js";
import { ProductQueryDto } from "../dto/product/product-query.dto.js";
import { Product } from "../entity/product.entity.js";
import { QueryCharacteristicsDto } from "../dto/characteristic/query-characteristics.dto.js";
import { Photo } from "../entity/photo.entity.js";
import { Label } from "../entity/label.entity.js";
import { Category } from "../entity/category.entity.js";
import { Brand } from "../entity/brand.entity.js";
import { Characteristic } from "../entity/characteristics.entity.js";
import { Price } from "../entity/price.entity.js";


interface CreateProductData {
    model : string 
    discription ?: string
    name : string 
    priceHistory : Price[]
    status : string 
    title : string
    images ?: Photo[]
    label : Label | null
    category : Category
    brand : Brand
    characteristics ?: Characteristic[]
}

const repo = myDataSource.getRepository(Product)

export class ProductService {

    async create (createProductData: CreateProductData) {
        
        const product = new Product()
        Object.assign(product, createProductData)
        return repo.save(product)
    }

    async delete (id: number) {
        return repo.delete(id)
    }
    
    update () {

    }

    
    getOne (id: number) {
        return repo.findOneBy({id})
    }

    async getIdsByCharacteristics (query: QueryCharacteristicsDto[]) {
        const set = new Set(query.map(item => item.name))
        
        const productsArrs = await Promise.all(Array.from(set).map(item => {
           const group = query.filter(elem => elem.name === item)
           
          return repo.find({
            where: {
                characteristics: group
            },
        }) 
        }))

        const lastItem = productsArrs.pop()?.map(product => product.id)
        
        const arrIds: number[] = []
        if(lastItem){
            lastItem.forEach(productId => {
                if(productsArrs.every(productArr => (productArr.map(product => product.id).includes(productId))))
                arrIds.push(productId)
            })
        }
        
        return arrIds
    }
    
    async getMany (query: ProductQueryDto) {
        const {limit, page, filter } = query
console.log(query);

        let ids: number[] | undefined

        if(query.filter?.characteristics && query.filter.characteristics.length){
            ids = await this.getIdsByCharacteristics(query.filter.characteristics)
        }
        
        let skip = 0
        if(page && limit) skip = page*limit 


        return repo.findAndCount({
            where: {
                title: filter && filter.like && ILike(`%${filter.like}%`),
                id: ids && In(ids),
                category: {
                    systemName: filter && filter.category && filter.category.systemName,
                    id: filter && filter.category && filter.category.id
                },
                brand: {
                    id: filter && filter.brand && filter.brand.id && In(filter.brand.id)
                },
                compareForUsers: filter && filter.compareForUsers ? {id: filter.compareForUsers.id} : undefined ,
                // brand:  filter && filter.brand && filter.brand.id && In(filter.brand.id),
                priceHistory: filter && filter.price && [{value: Between(filter.price[0], filter.price[1])}],
            },
            take: limit,
            skip
        })
    }
}

export const productService = new ProductService()