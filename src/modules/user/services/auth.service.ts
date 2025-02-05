import { PrismaService } from '@common/services/prisma.service';
import { ValidationService } from '@common/services/validation.service';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  LoginGoogleRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  TokenRequest,
} from '@user/interfaces/auth.interface';
import { UserResponse } from '@user/interfaces/user.interface';
import { AuthValidation } from '@user/validations/auth.validation';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.googleClient = new OAuth2Client(
      this.configService.get<string>('GOOGLE_CLIENT_ID'),
      this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
    );
  }

  createToken(body: TokenRequest): Promise<string> {
    return this.jwtService.signAsync(body);
  }

  async login(body: LoginRequest): Promise<LoginResponse> {
    const requestData = this.validationService.validate(
      AuthValidation.Login,
      body,
    );

    const user = await this.prismaService.user.findFirst({
      where: {
        username: requestData.username,
      },
    });

    if (!user) {
      throw new HttpException('User Not Found', 404);
    }

    if (!bcrypt.compareSync(requestData.password, user.password)) {
      throw new HttpException('Password invalid!', 400);
    }

    const payloadJwt = {
      email: user.email,
      username: user.username,
      name: user.name,
      id: user.id,
    };

    const token = await this.createToken(payloadJwt);

    return {
      token: token,
    };
  }

  async loginGoogle(body: LoginGoogleRequest): Promise<LoginResponse> {
    const google = await this.googleClient.verifyIdToken({
      idToken: body.token,
    });

    const payload = google.getPayload();

    let user = await this.prismaService.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      user = {
        name: payload.name,
        username: payload.name,
        email: payload.email,
      };

      await this.prismaService.user.create({
        data: user,
      });
    }

    const payloadJwt = {
      email: user.email,
      username: user.username,
      name: user.name,
      id: user.id,
    };

    const token = await this.createToken(payloadJwt);

    return {
      token: token,
    };
  }

  async register(body: RegisterRequest): Promise<UserResponse> {
    const registerData = this.validationService.validate(
      AuthValidation.Register,
      body,
    );

    const usernameExist = await this.prismaService.user.count({
      where: {
        username: registerData.username,
      },
    });

    if (usernameExist) {
      throw new HttpException('Username already exist', 400);
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(body.password, salt);

    const user = await this.prismaService.user.create({
      data: {
        ...body,
        password: hashPassword,
      },
    });

    const tokenUser = await this.createToken({
      username: user.username,
      name: user.name,
      id: user.id,
    });

    return {
      username: user.username,
      name: user.name,
      token: tokenUser,
    };
  }

  async getMe(body: User): Promise<UserResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: body.id,
      },
    });

    return {
      id: user.id,
      name: user.name,
      username: user.username,
    };
  }
}
