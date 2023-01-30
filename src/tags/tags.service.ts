import { Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { TagsListParamsQuery } from './tags.dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async getTags(params: TagsListParamsQuery): Promise<Tag[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.tag.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }
}
