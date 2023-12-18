import { User } from '@Apps/modules/user/domain/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'membership' })
export class Membership {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'sub_price' })
  subPrice: number;

  @Column({ name: 'sub_status' })
  subStatus: boolean;

  @Column({ name: 'sub_start' })
  subStart: Date;

  @Column({ name: 'sub_end' })
  subEnd: Date;

  @Column({ name: 'update_at' })
  updateAt: Date;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  User: User;
}
