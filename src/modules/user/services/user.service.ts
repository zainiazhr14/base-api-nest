import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '@common/services/prisma.service';
import { ValidationService } from '@common/services/validation.service';
import { Logger } from 'winston';
import {
  RegisterUserRequest,
  UserResponse,
} from '../interfaces/user.interface';
import { UserValidation } from '../validations/user.validation';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async register(request: RegisterUserRequest): Promise<UserResponse> {
    this.logger.info(`Register new user $${JSON.stringify(request)}`);
    const registerRequest: RegisterUserRequest =
      this.validationService.validate(UserValidation.REGISTER, request);

    const checkUsername = await this.prismaService.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    if (checkUsername) {
      throw new HttpException('Username Already Exist', 400);
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await this.prismaService.user.create({
      data: registerRequest,
    });

    return {
      username: user.username,
      name: user.name,
    };
  }
}
