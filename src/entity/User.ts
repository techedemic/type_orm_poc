import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Car } from './Car';

export enum Gender {
    M = 'Male',
    F = 'Female'
}

@Entity('table_users')
export class User {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'gender', nullable: true })
    gender: Gender;

    @OneToMany(() => Car, (car) => car.user, { eager: false })
    cars: Car[];

    @Column({
        name: 'updated_at',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false
    })
    updatedAt: string;

    // @Column({
    //   name: "created_at",
    //   type: "datetime",
    //   default: () => "CURRENT_TIMESTAMP",
    //   nullable: false,
    // })
    // createdAt: string;
}
