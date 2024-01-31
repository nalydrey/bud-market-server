import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, Relation  } from "typeorm";
import { Product } from "./product.entity.js";

@Entity()
export class Characteristic {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    value: string

    @Column({
        default: null,
        nullable: true
    })
    unit: string

    @ManyToOne(()=> Product, (product) => product.characteristics, {onDelete: 'CASCADE'})
    product: Relation<Product> 
}