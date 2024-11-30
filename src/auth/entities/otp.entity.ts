import {
  AfterInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { format } from 'date-fns';

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

  @AfterInsert()
  private _setExpirationDate(): void {
    const CREATED_AT = new Date(this.createdAt);
    const EXPIRES_AT = new Date(CREATED_AT.getTime() + 3600 * 1000); // 30 seconds

    this.expiresAt = format(EXPIRES_AT, 'yyyy-MM-dd HH:mm:ss.SSS');
  }
}
