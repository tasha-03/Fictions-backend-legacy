import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { UserService } from './users.service';

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UsersModule {}
