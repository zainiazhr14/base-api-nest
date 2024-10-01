import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RegisterUserRequest, UserResponse } from '../interfaces/user.interface';
import { WebResponse } from '../interfaces/web.interface';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('user')
@Controller('/users')
export class UserController {
  constructor(
    private userService: UserService
  ) { }

  @Post()
  async register(@Body() request: RegisterUserRequest): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.register(request);

    return {
      data: result
    }
  }
}
