// comment.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Car } from '../../car/entities/car.entity';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Sharh ID raqami' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Baholash (1 dan 5 gacha)' })
  rating: number;

  @Column()
  @ApiProperty({ description: 'Fikr matni' })
  comment: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ description: 'Sharhni yozgan foydalanuvchi' })
  user: User;

  @ManyToOne(() => Car, (car) => car.comments)
  @JoinColumn({ name: 'car_id' })
  @ApiProperty({ description: 'Sharh yozilgan mashina' })
  car: Car;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'Sharh yaratilgan sana va vaqt' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'Sharh yangilangan sana va vaqt' })
  updateAt: Date;
}
