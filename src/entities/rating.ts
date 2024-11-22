import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import Product from './product';
import User from './user';
import Media from './media';

@Entity()
export default class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', enum: [1, 2, 3, 4, 5] })
    rate: number;

    @Column({ type: 'text', nullable: true })
    comment: string;
    
    @JoinTable({name: 'rating_media',
        joinColumn: {name: 'rating_id'},
        inverseJoinColumn: {name: 'media_id'}
    })
    @ManyToMany(() => Media, media => media.ratings)
    media: Media[];

    @JoinColumn({name: 'product_id'})
    @ManyToOne(() => Product, product => product.ratings)
    product: Product;

    @JoinColumn({name: 'user_id'})
    @ManyToOne(() => User, user => user.ratings)
    user: User;

    @Column({ select: false })
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", select: false })
    public created_at: Date;
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)", select: false })
    public updated_at: Date;
}