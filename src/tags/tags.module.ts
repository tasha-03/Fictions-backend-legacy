import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { TagController } from './tags.controller';
import { TagService } from './tags.service';

@Module({
  providers: [TagService, PrismaService],
  controllers: [TagController]
})
export class TagModule {}
