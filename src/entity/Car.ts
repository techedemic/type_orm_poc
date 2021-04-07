import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity('table_car')
export class Car {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @ManyToOne(() => User, (user) => user.cars)
    user: User;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column({
        name: 'updated_at',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false
    })
    updatedAt: string;

    @Column({
        name: 'created_at',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false
    })
    createdAt: string;
}
