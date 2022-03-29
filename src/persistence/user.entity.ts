import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PasswordEntity } from './password.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ name: 'first_name', length: 100 })
  firstName: string;
  @Column({ name: 'last_name', length: 100 })
  lastName: string;
  @Column({ name: 'born_date' })
  borndate: Date;
  @Column({ name: 'mail', length: 100, unique: true })
  mail: string;
  @OneToMany(() => PasswordEntity, (password) => password.user, {
    cascade: true,
  })
  passwords: PasswordEntity[];
}
