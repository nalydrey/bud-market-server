import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Product } from "./product.entity.js";

@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    name: string

    @Column()
    logoImg: string

    @OneToMany(() => Product, (product) => product.brand)
    products: Relation<Product[]>
}