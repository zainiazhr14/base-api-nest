import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { UserModule } from '@user/user.module';
import { AdditionalCommonModule } from './modules/additional-common/additional-common.module';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [CommonModule, UserModule, AdditionalCommonModule, FileModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
