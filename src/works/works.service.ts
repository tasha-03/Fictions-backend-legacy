import { Injectable } from '@nestjs/common';
import { Prisma, Work } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { WorkInfoDto } from './works.dto';

@Injectable()
export class WorkService {
  constructor(private prisma: PrismaService) {}

  async getWork(
    workWhereUniqueInput: Prisma.WorkWhereUniqueInput,
  ): Promise<Work | null> {
    return this.prisma.work.findFirst({
      where: { ...workWhereUniqueInput, published: true },
      include: {
        tags: true,
        fandoms: true,
      },
    });
  }

  async createWork(data: Prisma.WorkCreateInput): Promise<Work> {
    return this.prisma.work.create({
      data,
      include: {
        tags: true,
        fandoms: true,
      },
    });
  }

  async getWorks(params: {
    skip?: number;
    take?: number;
    where?: Prisma.WorkWhereInput;
    orderBy?: Prisma.WorkOrderByWithRelationInput;
  }): Promise<WorkInfoDto[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.work.findMany({
      skip,
      take,
      where: { ...where, published: true },
      orderBy,
      select: {
        id: true,
        title: true,
        lang: true,
        rating: true,
        category: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
        fandoms: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
