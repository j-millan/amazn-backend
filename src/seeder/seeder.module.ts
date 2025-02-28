import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/shop/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
})
export class SeederModule {}
