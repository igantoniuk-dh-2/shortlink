import { HttpException, Injectable } from '@nestjs/common';
import { DeleteShortLinkDto } from 'src/app.dto';
import { DeleteShortLinkResult } from 'src/app.interface';
import { CreateAppService } from './create-app.service';
import { User } from 'src/user/user.schema';

@Injectable()
export class DeleteAppService extends CreateAppService {
  async delete(
    dto: DeleteShortLinkDto,
    user: Partial<User>,
  ): Promise<DeleteShortLinkResult> {
    const filter = {
      _id: dto.id,
      userId: user.ID,
    };
    const link = await this.linksModel.findOneAndDelete(filter);
    await this.redis.deleteValue(link.shortLink);

    if (!link) throw new HttpException('link not found', 404);

    return {
      id: dto.id,
    };
  }
}
