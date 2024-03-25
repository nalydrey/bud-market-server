
import { AfterUpdate, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { OrderItem } from "./order-item.entity.js";
import { User } from "./user.entity.js";
import { Product } from "./product.entity.js";

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
    
    @Column({
        default: 'new'
    })
    status: string

    @Column({
        nullable: true
    })
    completeDate: Date

    @OneToMany(()=> OrderItem, (orderItem) => orderItem.order, {eager: true})
    goods: Relation<OrderItem[]>

    @ManyToOne(()=> User, (user) => user.orders)
    user: Relation<User>

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @BeforeUpdate()
    updateCompleteDate () {
        if(this.status === 'completed') this.completeDate = new Date()  
    }
}