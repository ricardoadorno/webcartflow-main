import { Entity, PrimaryGeneratedColumn, Column, JoinTable, JoinColumn, OneToOne, ManyToMany, OneToMany } from 'typeorm';
import User from './user';
import CartProduct from './cart-product';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => CartProduct, cartProduct => cartProduct.cart)
    cartProduct: CartProduct[];

    @OneToOne(() => User, user => user.cart)
    @JoinColumn({name: 'user_id'})
    user: User;
}