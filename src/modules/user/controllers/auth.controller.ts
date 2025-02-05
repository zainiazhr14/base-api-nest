import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  LoginGoogleRequest,
} from '@user/interfaces/auth.interface';
import { UserResponse } from '@user/interfaces/user.interface';
import { WebResponse } from '@user/interfaces/web.interface';
import { AuthService } from '@user/services/auth.service';
import { Auth } from '@common/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('/users/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async Login(@Body() body: LoginRequest): Promise<WebResponse<LoginResponse>> {
    const result = await this.authService.login(body);

    return {
      data: result,
    };
  }

  @Post('/login/google')
  async LoginGoogle(
    @Body() body: LoginGoogleRequest,
  ): Promise<WebResponse<LoginResponse>> {
    const result = await this.authService.loginGoogle(body);

    return {
      data: result,
    };
  }

  @Post('/register')
  async Register(
    @Body() body: RegisterRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.authService.register(body);

    return {
      data: result,
    };
  }

  @Get('/me')
  async GetMe(@Auth() user: User): Promise<WebResponse<UserResponse>> {
    const response = await this.authService.getMe(user);

    return {
      data: response,
    };
  }
}
