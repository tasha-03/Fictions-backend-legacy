import { Controller, Get, Query } from '@nestjs/common';
import { Public } from 'src/common/public.decorator';
import { TagsListParamsQuery } from './tags.dto';
import { TagService } from './tags.service';

@Controller('tags')
export class TagController {
  constructor(private tagService: TagService) {}

  @Public()
  @Get()
  async getTagsList(@Query() query: TagsListParamsQuery) {
    return this.tagService.getTags(query);
  }
}
