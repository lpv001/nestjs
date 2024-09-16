import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Shop } from "./shop.entity";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false, name: 'username' })
    username: string

    @Column({ nullable: false, name: 'password' })
    password: string

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Shop, (shop) => shop.user)
    shops: Shop[];
}