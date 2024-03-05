import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Product } from "./product.entity.js";
import { Order } from "./order.entity.js";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Product, {eager: true})
    @JoinColumn()
    product: Relation<Product>

    @ManyToOne(() => Order)
    order: Relation<Order>

    @Column()
    qty: number
}
