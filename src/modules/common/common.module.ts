import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './services/prisma.service';
import { ValidationService } from './services/validation.service';
import * as winston from 'winston';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './filters/error.filter';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt'


@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: "7d"
        }
      }),
      inject: [ConfigService]
    }),
    WinstonModule.forRoot({
      format: winston.format.json(),
      transports: [
        new winston.transports.Console()
      ]
    })
  ],
  providers: [PrismaService, ValidationService, {
    provide: APP_FILTER,
    useClass: ErrorFilter
  }],
  exports: [PrismaService, ValidationService]
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      AuthMiddleware
    ).forRoutes('api/*')
  }
}
