import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation, Tree, TreeChildren, TreeParent } from "typeorm";
import { Product } from "./product.entity.js";
import { Photo } from "./photo.entity.js";


@Entity()
@Tree('materialized-path')
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    systemName: string

    @Column({
        unique: true
    })
    name: string

    @TreeChildren()
    children: Category[]

    @TreeParent()
    parent: Category

    @OneToOne(()=>Photo, (photo) =>  photo.category, {eager: true})
    @JoinColumn()
    photo: Relation<Photo>

    @OneToMany(() => Product, (product) => product.category)
    products: Relation<Product[]>
}