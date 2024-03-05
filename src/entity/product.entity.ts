import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, AfterLoad } from "typeorm"
import { Characteristic } from "./characteristics.entity.js"
import { Brand } from "./brand.entity.js"
import { Photo } from "./photo.entity.js"
import { Price } from "./price.entity.js"
import { Label } from "./label.entity.js"
import { Category } from "./category.entity.js"
import { User } from "./user.entity.js"
import { Review } from "./review.entity.js"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    name: string

    @Column()
    model: string

    @Column()
    discription: string

    @Column()
    status: string

    @Column({
        default: 0
    })
    rating: number

    @Column({
        default: 0
    })
    viewCounter: number

    @OneToMany(() =>Review, (review) =>review.product, {eager: true})
    reviews: Relation<Review[]> 

    @ManyToOne(() => Category, (category) => category.products, {eager: true}) 
    category: Relation<Category>

    @ManyToMany(() => User, (user) => user.favorite)
    favoriteForUsers: Relation<User[]> 
   
    @ManyToMany(() => User, (user) => user.compare)
    compareForUsers: Relation<User[]> 

    @ManyToOne(() => Label, (label) => label.products, {eager: true, onDelete: 'SET NULL'} )
    label: Relation<Label>

    @ManyToOne(() => Brand, (brand) => brand.products, {eager: true})
    brand: Relation<Brand>

    @OneToMany(() => Price, (price) => price.product, {eager: true} )
    priceHistory: Relation<Price[]>

    @OneToMany(() => Photo, (photo) => photo.products, {eager: true} )
    images: Relation<Photo[]> 

    @OneToMany(()=>Characteristic, (characteristic)=> characteristic.product, {eager: true} )
    characteristics: Relation<Characteristic[]>

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @AfterLoad()
    countReviews(){
        this.viewCounter = this.reviews.length
    }
    
    @AfterLoad()
    countAvarageValue(){
        const validValues = this.reviews.map(review => review.value).filter(rev => rev)
        this.rating = validValues.reduce((summ, elem) => summ + elem , 0)/validValues.length
    }

}
