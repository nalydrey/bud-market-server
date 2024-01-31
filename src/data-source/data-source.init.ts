import { DataSource } from "typeorm"
import {config} from 'dotenv'
import { Product } from "../entity/product.entity.js"
import { Characteristic } from "../entity/characteristics.entity.js"
import { Brand } from "../entity/brand.entity.js"
import { Price } from "../entity/price.entity.js"
import { Photo } from "../entity/photo.entity.js"
import { Label } from "../entity/label.entity.js"
import { Category } from "../entity/category.entity.js"
config()
const PORT = process.env.DB_PORT && +process.env.DB_PORT || 3306


export const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_SERVER,
    port: PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_BASENAME,
    entities: [Characteristic, Product, Brand, Price, Photo, Label, Category],
    logging: true,
    synchronize: true,
})