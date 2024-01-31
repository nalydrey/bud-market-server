import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation, Tree, TreeChildren, TreeParent } from "typeorm";
import { Product } from "./product.entity.js";


@Entity()
@Tree('materialized-path')
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    systemName: string

    @Column()
    name: string

    @TreeChildren()
    children: Category[]

    @TreeParent()
    parent: Category

    @OneToMany(() => Product, (product) => product.category)
    products: Relation<Product[]>
}