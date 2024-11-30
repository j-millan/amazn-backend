import { format } from 'date-fns';
import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class OTP {
  @PrimaryColumn('varchar', { length: 6, unique: true })
  otp: string;

  @Column('varchar', { length: 254, unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: string;

  @Column('timestamp')
  expiresAt: string;

  @BeforeUpdate()
  private _setExpirationDate(): void {
    const CREATED_AT = new Date(this.createdAt);
    const EXPIRES_AT = new Date(CREATED_AT.getTime() + 30 * 1000); // 30 seconds

    this.expiresAt = format(EXPIRES_AT, 'yyyy-MM-dd HH:mm:ss.SSS');
  }
}
