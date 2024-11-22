import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from "typeorm"
import Rating from './rating'
import { Cart } from './cart'
import CartProduct from './cart-product'

@Entity()
export default class Product {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column('decimal')
    price: number

    @Column()
    image: string

    @Column()
    category: string

    @OneToMany(() => Rating, rating => rating.user)
    ratings: Rating[];

    @OneToMany(() => Cart, cart => cart.cartProduct)
    cartProduct: CartProduct[];

    @Column({ select: false })
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", select: false })
    public created_at: Date;
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)", select: false })
    public updated_at: Date;

}