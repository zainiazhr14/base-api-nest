import { Global, Module } from '@nestjs/common';
import { Mongoose } from './providers/mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('DB_MONGO_URL'),
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  providers: [Mongoose],
})
export class AdditionalCommonModule {}
