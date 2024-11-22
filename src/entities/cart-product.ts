import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Product from './product';
import { Cart } from './cart';


@Entity('cart_product')
export default class CartProduct {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity: number   

    @JoinColumn({name: 'cart_id'})
    @ManyToOne(() => Cart, cart => cart.cartProduct)
    cart: Cart;

    @JoinColumn({name: 'product_id'})
    @ManyToOne(() => Product, product => product.cartProduct)
    product: Product;
}