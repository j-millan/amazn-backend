import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class OTP {
  @PrimaryColumn('varchar', { length: 100, unique: true })
  otp: string;

  @Column('varchar', { length: 254, unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp')
  expiresAt: Date;
}
