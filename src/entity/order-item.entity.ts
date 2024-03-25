import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Product } from "./product.entity.js";
import { Order } from "./order.entity.js";
import { User } from "./user.entity.js";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    qty: number

    @ManyToOne(() => Product, (product) => product.orderItems, {eager: true})
    product: Relation<Product>

    @ManyToOne(() => Order, (order) => order.goods, {onDelete: 'CASCADE'} )
    order: Relation<Order>

    @ManyToOne(() => User, (user) => user.basket)
    usersBasket: Relation<User>
}
