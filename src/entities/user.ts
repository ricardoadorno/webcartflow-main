import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { OneToMany } from "typeorm";
import Rating from './rating';
import { Cart } from './cart';

@Entity()
export default class User {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @OneToMany(() => Rating, rating => rating.user)
    ratings: Rating[];

    @JoinColumn()
    @OneToOne(() => Cart, cart => cart.user)
    cart: Cart;

    @Column({ select: false })
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", select: false })
    public created_at: Date;
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)", select: false })
    public updated_at: Date;

}