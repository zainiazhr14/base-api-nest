import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Config
  const config = app.get(ConfigService);
  const APP_PORT = config.get<number>('APP_PORT');

  //  Global Plugins
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  app.setGlobalPrefix('api');
  app.enableShutdownHooks();

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('BASE API APPLICATION')
    .setDescription('Base API for application development')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentSwagger = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('documentation', app, documentSwagger, {
    jsonDocumentUrl: 'documentation/json',
    explorer: true,
  });

  await app.listen(APP_PORT, '0.0.0.0');
  console.log(`Application running on http://localhost:${APP_PORT}`);
}
bootstrap();
