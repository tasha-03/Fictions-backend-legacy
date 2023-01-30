import { Injectable } from '@nestjs/common';
import { Fandom } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { FandomsListParamsQuery } from './fandoms.dto';

@Injectable()
export class FandomService {
  constructor(private prisma: PrismaService) {}

  async getFandoms(params: FandomsListParamsQuery): Promise<Fandom[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.fandom.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }
}
