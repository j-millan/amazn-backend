import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const APP = await NestFactory.create(AppModule);
  APP.setGlobalPrefix('api');
  APP.useGlobalPipes(new ValidationPipe({ transform: true }));

  const SWAGGER_CONFIG = new DocumentBuilder()
    .setTitle('Amazn API')
    .setDescription('API for Amazn eShop.')
    .setVersion('1.0')
    .build();
  const DOCUMENT = SwaggerModule.createDocument(APP, SWAGGER_CONFIG);
  SwaggerModule.setup('api/docs', APP, DOCUMENT);

  await APP.listen(3000);
}
bootstrap();
