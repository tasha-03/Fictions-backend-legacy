import { Controller, Get, Query } from '@nestjs/common';
import { Public } from 'src/common/public.decorator';
import { FandomsListParamsQuery } from './fandoms.dto';
import { FandomService } from './fandoms.service';

@Controller('fandoms')
export class FandomController {
  constructor(private fandomService: FandomService) {}

  @Public()
  @Get()
  async getFandomsList(@Query() query: FandomsListParamsQuery) {
    return { success: true, data: await this.fandomService.getFandoms(query) };
  }
}
