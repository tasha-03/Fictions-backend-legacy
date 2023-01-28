import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Request,
} from '@nestjs/common';
import { Auth } from 'src/common/auth.decorator';
import { Public } from 'src/common/public.decorator';
import { Role } from 'src/common/role.enum';
import { ListParamsQuery } from './users.dto';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserProfile({ id });
  }

  @Get()
  @Auth(Role.Admin)
  async getUsersList(@Query() query: ListParamsQuery, @Request() req) {
    console.log({ user: req.user });
    return this.userService.getUsers(query);
  }
}
