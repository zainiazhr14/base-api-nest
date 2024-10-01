import { Module } from '@nestjs/common';
import { FileController } from './controllers/file.controller';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';

@Module({
  imports: [FastifyMulterModule],
  controllers: [FileController]
})
export class FileModule { }
