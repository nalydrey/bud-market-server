import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Product } from "./product.entity.js";

@Entity()
export class Label {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    name: string

    @Column()
    color: string

    @OneToMany(() => Product, (product) => product.label)
    products: Relation<Product[]>
}