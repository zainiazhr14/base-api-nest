import { ApiProperty } from "@nestjs/swagger";

export class LoginRequest {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class LoginGoogleRequest {
  @ApiProperty({ required: true })
  token: string;
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
  password: string;
}

export class TokenRequest {
  name: string;
  username: string;
  id: number;
}
