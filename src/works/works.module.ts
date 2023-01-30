import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { WorkController } from './works.controller';
import { WorkService } from './works.service';

@Module({
  providers: [WorkService, PrismaService],
  controllers: [WorkController],
})
export class WorkModule {}
