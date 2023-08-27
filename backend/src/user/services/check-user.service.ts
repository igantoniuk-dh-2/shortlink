import { HttpException, Injectable } from '@nestjs/common';
import { CheckDto } from '../user.dto';
import { LoginUserResult } from '../user.interface';
import { User } from '../user.schema';
import { CreateUserService } from './create-user.service';

@Injectable()
export class CheckUserService extends CreateUserService {
  async check(dto: CheckDto): Promise<LoginUserResult> {
    const user = await this.extractData(dto.jwt);
    return {
      jwt: dto.jwt,
      user,
    };
  }

  private async extractData(jwt: string): Promise<Partial<User>> {
    try {
      const data: Partial<User> = await this.jwtService.verifyAsync(jwt);
      return data;
    } catch (e) {
      throw new HttpException('bad token', 401);
    }
  }
}
