import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity.js";
import { Order } from "./order.entity.js";
import { OrderItem } from "./order-item.entity.js";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string
    
    @Column({
        nullable: true
    })
    lastName: string

    @Column()
    role: string

    @Column({
        unique: true
    })
    email: string

    @Column({
        unique: true
    })
    phone: string

    @Column()
    password: string

    @ManyToMany(() => Product, (product) => product.favoriteForUsers, {eager: true})
    @JoinTable()
    favorite: Relation<Product[]> 
    
    @ManyToMany(() => Product, (product) => product.compareForUsers, {eager: true})
    @JoinTable()
    compare: Relation<Product[]> 

    @OneToMany(() => OrderItem, (orderItem) => orderItem.usersBasket, {eager: true})
    basket: Relation<OrderItem[]>

    @OneToMany(() => Order, (order) => order.user, {eager: true})
    orders: Relation<Order[]>

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}