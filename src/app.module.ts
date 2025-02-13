import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { UserModule } from '@user/user.module';
import { AdditionalCommonModule } from './modules/additional-common/additional-common.module';
import { FileModule } from './modules/file/file.module';
import { GraphqlModule } from './modules/graphql/graphql.module';
@Module({
  imports: [
    CommonModule,
    UserModule,
    AdditionalCommonModule,
    FileModule,
    GraphqlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
