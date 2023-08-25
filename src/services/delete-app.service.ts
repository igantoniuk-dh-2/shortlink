import { HttpException, Injectable } from '@nestjs/common';
import { DeleteShortLinkDto } from 'src/app.dto';
import { DeleteShortLinkResult } from 'src/app.interface';
import { CreateAppService } from './create-app.service';

@Injectable()
export class DeleteAppService extends CreateAppService {
  async delete(dto: DeleteShortLinkDto): Promise<DeleteShortLinkResult> {
    const filter = {
      _id: dto.id,
    };
    const link = await this.linksModel.findOneAndDelete(filter);
    await this.redis.deleteValue(link.shortLink);

    if (!link) throw new HttpException('link not found', 404);

    return {
      id: dto.id,
    };
  }
}
