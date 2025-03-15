import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Ativando validação global dos DTOs
  app.useGlobalPipes(new ValidationPipe());

  // ✅ Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Reservas')
    .setDescription('Documentação da API de Reservas')
    .setVersion('1.0')
    .addBearerAuth() // Adiciona autenticação JWT no Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // URL: /api

  await app.listen(3000);
}
bootstrap();
