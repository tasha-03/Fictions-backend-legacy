import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({default: "user@example.mail"})
  email: string;
  @ApiProperty({default: "user123"})
  password: string;
}

export class RegisterDto {
  @ApiProperty({default: "user@example.mail"})
  email: string;
  @ApiProperty({default: "user123"})
  password: string;
  @ApiProperty({default: "user"})
  username: string;
  @ApiProperty({default: "31-03-2003"})
  birthdate: string;
}

export class UserJwtSignedModel {
  id: number;
  email: string;
  username: string;
  role: string;
}

export class ValidateResult {
  id: number;
  email: string;
  username: string;
  birthdate: string;
  role: string;
}

