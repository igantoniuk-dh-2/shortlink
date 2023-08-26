import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { AppService } from './services/app.service';
import {
  CreateShortLinkDto,
  DeleteShortLinkDto,
  ReadShortLinkDto,
} from './app.dto';
import { ApiParam } from '@nestjs/swagger';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(readonly appService: AppService) {}
  @Get('/all')
  readAll() {
    return this.appService.readAll();
  }
  @Get('/:shortLink')
  @ApiParam({
    name: 'shortLink',
  })
  async redirect(@Param() dto: ReadShortLinkDto, @Res() res: Response) {
    const url = await this.appService.read(dto);
    res.redirect(url);
    return url;
  }

  @Post('/')
  create(@Body() dto: CreateShortLinkDto) {
    return this.appService.create(dto);
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
  })
  delete(@Param() dto: DeleteShortLinkDto) {
    return this.appService.delete(dto);
  }
}
