import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user.dto';
import { LoginUserResult } from '../user.interface';
import { BaseUserService } from './base-user.service';

@Injectable()
export class CreateUserService extends BaseUserService {
  async create(dto: CreateUserDto): Promise<LoginUserResult> {
    const { email, password } = dto;

    const findUser = await this.userModel.findOne({ email });
    if (findUser) throw new HttpException('user already exists', 400);

    const user = await this.userModel.create({
      email,
      password: this.crypt(password),
    });

    if (!user) throw new HttpException('wrong credentials', 401);

    user.password = undefined;
    return {
      user: this.prepareUser(user),
      jwt: await this.jwtService.signAsync(JSON.stringify(user)),
    };
  }
}
