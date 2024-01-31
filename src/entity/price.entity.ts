import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity.js";

@Entity()
export class Price {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    value: string

    @ManyToOne(() => Product, (product) => product.priceHistory)
    product: Relation<Product>

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}
