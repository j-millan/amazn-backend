import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const APP = await NestFactory.create(AppModule);
  APP.setGlobalPrefix('api');
  await APP.listen(3000);
}
bootstrap();
