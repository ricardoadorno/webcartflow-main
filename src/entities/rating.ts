import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinTable, Column } from 'typeorm';
import Product from './product';
import User from './user';

@Entity()
export default class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', enum: [1, 2, 3, 4, 5] })
    ratingValue: number;

    @Column({ type: 'text', nullable: true })
    comment: string;

    @ManyToOne(() => Product, product => product.ratings)
    @JoinTable()
    product: Product;

    @ManyToOne(() => User, user => user.ratings)
    @JoinTable()
    user: User;
}