import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from '../user.dto';
import { LoginUserResult } from '../user.interface';
import { CheckUserService } from './check-user.service';

@Injectable()
export class LoginUserService extends CheckUserService {
  async login(dto: LoginDto): Promise<LoginUserResult> {
    const { email, password } = dto;
    const user = await this.userModel.findOne({
      email,
      password: this.crypt(password),
    });

    if (!user) throw new HttpException('wrong credentials', 401);

    return {
      user: this.prepareUser(user),
      jwt: await this.jwtService.signAsync(JSON.stringify(user)),
    };
  }
}
