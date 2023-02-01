import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Request,
  Query,
} from '@nestjs/common';
import { Public } from 'src/common/public.decorator';
import { Role } from 'src/common/role.enum';
import { Roles } from 'src/common/roles.decorator';
import { UsersListParamsQuery } from './users.dto';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles(Role.Admin)
  async getUsersList(@Query() query: UsersListParamsQuery) {
    return { success: true, data: await this.userService.getUsers(query) };
  }

  @Get('me')
  async getMe(@Request() req) {
    return {
      success: true,
      data: await this.userService.getUserProfile({ email: req.user.email }),
    };
  }

  @Public()
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.userService.getUserProfile({ id }),
    };
  }
}
