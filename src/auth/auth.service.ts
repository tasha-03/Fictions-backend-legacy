import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUser({ email });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register({email, password, username, birthdate}) {
    const user = await this.usersService.createUser({email, password, username, birthdate}) 
    if (!user) return {message: "User already exists"}
    return user
  }
}
