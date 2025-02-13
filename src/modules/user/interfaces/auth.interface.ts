import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class LoginGoogleRequest {
  @ApiProperty({ required: true })
  token: string;
}

export class LoginPhoneRequest {
  @ApiProperty({ required: true })
  country_code: string;

  @ApiProperty({ required: true })
  phone_number: string;
}

export class LoginResponse {
  token: string;
}

export class RegisterRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class TokenRequest {
  name: string;
  username: string;
  id: string;
}
