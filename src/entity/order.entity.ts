
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { OrderItem } from "./order-item.entity.js";
import { User } from "./user.entity.js";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    phone: string

    @Column()
    email: string

    @OneToMany(()=> OrderItem, (item) => item.order, {eager: true, onDelete: 'CASCADE'} )
    goods: Relation<OrderItem[]>

    @ManyToOne(()=> User, (user) => user.orders)
    user: Relation<User>

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}