import {
  Controller,
  Get,
  Post,
  Query,
  Request,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Public } from 'src/common/public.decorator';
import { WorkCreateDto, WorksListParamsQuery } from './works.dto';
import { WorkService } from './works.service';

@Controller('works')
export class WorkController {
  constructor(private workService: WorkService) {}

  @Public()
  @Get()
  async getWorksList(@Query() query: WorksListParamsQuery) {
    return { success: true, data: await this.workService.getWorks(query) };
  }

  @Post()
  async createWork(@Body() body: WorkCreateDto, @Request() req) {
    const { tags, fandoms, ...bodyRest } = body;
    return {
      success: true,
      data: await this.workService.createWork({
        ...bodyRest,
        author: { connect: { email: req.user.email } },
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: tag.id ? { id: tag.id } : { name: tag.name },
            create: { name: tag.name },
          })),
        },
        fandoms: {
          connectOrCreate: fandoms.map((fandom) => ({
            where: fandom.id ? { id: fandom.id } : { name: fandom.name },
            create: { name: fandom.name },
          })),
        },
      }),
    };
  }

  @Get('myworks')
  async getMyWorks(@Request() req, @Query() query: WorksListParamsQuery) {
    return {
      success: true,
      data: await this.workService.getUserWorks({
        ...query,
        userId: req.user.id,
      }),
    };
  }

  @Public()
  @Get(':id')
  async getWorkById(@Param('id', ParseIntPipe) id: number) {
    return { success: true, data: await this.workService.getWork({ id }) };
  }
}
