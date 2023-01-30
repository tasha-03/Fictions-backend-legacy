export class LoginDto {
  email: string;
  password: string;
}

export class RegisterDto {
  email: string;
  password: string;
  username: string;
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

