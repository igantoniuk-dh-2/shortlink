import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './services/app.service';
import {
  CreateShortLinkDto,
  DeleteShortLinkDto,
  ReadShortLinkDto,
} from './app.dto';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthGuard } from './guards/jwt.guard';

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(readonly appService: AppService) {}

  @UseGuards(AuthGuard)
  @Get('/all')
  readAll(@Req() req: Request) {
    return this.appService.readAll(req['user']);
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

  @UseGuards(AuthGuard)
  @Post('/')
  create(@Body() dto: CreateShortLinkDto, @Req() req: Request) {
    return this.appService.create(dto, req['user']);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  @ApiParam({
    name: 'id',
  })
  delete(@Param() dto: DeleteShortLinkDto, @Req() req: Request) {
    return this.appService.delete(dto, req['user']);
  }
}
