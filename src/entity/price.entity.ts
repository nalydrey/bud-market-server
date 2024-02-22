import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity.js";

@Entity()
export class Price {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    value: number

    @ManyToOne(() => Product, (product) => product.priceHistory, {onDelete: 'CASCADE'})
    product: Relation<Product>

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}
