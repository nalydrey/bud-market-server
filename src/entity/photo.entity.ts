import { AfterLoad, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity.js";
import { Category } from "./category.entity.js";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    fileName: string

    @ManyToOne(() => Product, (product) => product.images, {onDelete: 'CASCADE'})
    products: Relation<Product[]>

    @OneToOne(()=>Category, (category) => category.photo, {onDelete: 'CASCADE'})
    category: Relation<Category>

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @AfterLoad()
    addHostPrefix(){
        this.fileName =`${process.env.SERVER_PROTOCOL}://${process.env.SERVER_ADRESS}:${process.env.APP_PORT}/${this.fileName}`
    }
}