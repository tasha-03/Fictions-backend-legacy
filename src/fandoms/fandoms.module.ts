import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { FandomController } from './fandoms.controller';
import { FandomService } from './fandoms.service';

@Module({
  providers: [FandomService, PrismaService],
  controllers: [FandomController]
})
export class FandomModule {}
