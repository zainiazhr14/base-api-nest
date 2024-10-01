import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtService } from '@nestjs/jwt'

@Module({
  providers: [UserService, AuthService],
  controllers: [UserController, AuthController],
})
export class UserModule { }
