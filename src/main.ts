import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const APP = await NestFactory.create(AppModule);
  const CONFIG_SERVICE = APP.get(ConfigService);
  const PORT = CONFIG_SERVICE.get('APP_PORT') || 3001;

  APP.enableCors({ origin: 'http://localhost:3000' });
  registerGlobals(APP);

  const SWAGGER_CONFIG = new DocumentBuilder()
    .setTitle('Amazn API')
    .setDescription('API for Amazn eShop.')
    .setVersion('1.0')
    .build();
  const DOCUMENT = SwaggerModule.createDocument(APP, SWAGGER_CONFIG);
  SwaggerModule.setup('api/docs', APP, DOCUMENT);

  await APP.listen(PORT);
}

async function registerGlobals(app: INestApplication): Promise<void> {
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
}

bootstrap();
