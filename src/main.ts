import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const APP = await NestFactory.create(AppModule);
  APP.enableCors({ origin: 'http://localhost:3001' });
  registerGlobals(APP);

  const SWAGGER_CONFIG = new DocumentBuilder()
    .setTitle('Amazn API')
    .setDescription('API for Amazn eShop.')
    .setVersion('1.0')
    .build();
  const DOCUMENT = SwaggerModule.createDocument(APP, SWAGGER_CONFIG);
  SwaggerModule.setup('api/docs', APP, DOCUMENT);

  await APP.listen(3000);
}

async function registerGlobals(app: INestApplication): Promise<void> {
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
}

bootstrap();
