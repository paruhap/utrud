import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Настройка CORS и кодировки
  app.enableCors();
  
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  
  // Настройка Express для правильной работы с кириллицей
  app.use((req, res, next) => {
    res.charset = 'utf-8';
    next();
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
