import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configurar las opciones de CORS
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // Reemplaza con la URL de tu aplicación Next.js
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  // Habilitar el middleware CORS
  app.enableCors(corsOptions);

  await app.listen(3001);
}
bootstrap();
