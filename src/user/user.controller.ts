import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CheckDto, CreateUserDto, LoginDto } from './user.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}
  @Get('/login')
  login(@Query() dto: LoginDto) {
    return this.userService.login(dto);
  }
  @Post('/signup')
  signup(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
  @Get('/check')
  @ApiQuery({ name: 'jwt' })
  check(@Query() dto: CheckDto) {
    return this.userService.check(dto);
  }
}
