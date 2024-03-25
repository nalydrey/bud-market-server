import { AfterLoad, Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Product } from "./product.entity.js";

@Entity()
export class Brand {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    name: string

    @Column({
        nullable: true,
        default: null
    })
    logoImg?: string

    @OneToMany(() => Product, (product) => product.brand)
    products: Relation<Product[]>

    @AfterLoad()
    addHostPrefix(){
        if(this.logoImg){
            this.logoImg =`${process.env.SERVER_PROTOCOL}://${process.env.SERVER_ADRESS}:${process.env.APP_PORT}/${this.logoImg}`
        }
    }
}