import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Rating from './rating';

@Entity()
export default class Media {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uuid: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    size: number;

    @Column()
    url: string;

    @ManyToMany(() => Rating,  rating => rating.media)
    ratings: Rating[];

}