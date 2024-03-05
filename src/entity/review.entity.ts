import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm"
import { Product } from "./product.entity.js"


@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userName: string

    @Column()
    text: string

    @Column({
        nullable: true
    })
    value: number 

    @ManyToOne(() => Product, (product) => product.reviews)
    product: Relation<Product> 

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}