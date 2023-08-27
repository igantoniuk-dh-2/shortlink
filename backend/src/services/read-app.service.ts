import { HttpException, Injectable } from '@nestjs/common';
import { BaseAppService } from './base-app.service';
import { ReadAllLinksResult, cacheTtl } from 'src/app.interface';
import * as _ from 'lodash';
import { ReadShortLinkDto } from 'src/app.dto';
import { User } from 'src/user/user.schema';

@Injectable()
export class ReadAppService extends BaseAppService {
  async readAll(user: Partial<User>): Promise<ReadAllLinksResult> {
    // в редисе не ищем, чтобы не грузить его фулсканом
    const links = await this.linksModel.find({ userId: user.ID }).exec();
    return {
      links: links.map((link) =>
        _.pick(link, 'shortLink', 'longLink', 'id', 'createdAt', 'userId'),
      ),
    } as ReadAllLinksResult;
  }

  async read(dto: ReadShortLinkDto) {
    const valFromCache = await this.redis.get(dto.shortLink);

    if (valFromCache) return valFromCache;

    const valFromDB = await this.linksModel.findOne({
      shortLink: dto.shortLink,
    });

    if (!valFromDB) throw new HttpException('link not found', 404);

    await this.redis.setexValue(dto.shortLink, valFromDB.longLink, cacheTtl);
    return valFromDB.longLink;
  }
}
