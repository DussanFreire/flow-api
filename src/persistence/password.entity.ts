import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity('password')
export class PasswordEntity extends BaseEntity {
  @Column({ length: 256 })
  hash: string;

  @Column({ length: 64 })
  salt: string;

  @Column('int', { default: 2 })
  status: number;

  @ManyToOne(() => UserEntity, (user) => user.passwords)
  user: UserEntity;
}
