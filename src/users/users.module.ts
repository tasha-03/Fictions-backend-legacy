import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
