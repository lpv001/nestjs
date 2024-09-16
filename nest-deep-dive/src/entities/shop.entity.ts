import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'shops' })
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'shop_name' })
  shopName: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.shops)
  user: User;
}