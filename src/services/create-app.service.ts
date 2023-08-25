import { Injectable } from '@nestjs/common';
import { CreateShortLinkDto } from 'src/app.dto';
import { CreateShortLinkResult } from 'src/app.interface';
import { ReadAppService } from './read-app.service';
import mongoose from 'mongoose';

import * as nanoid from 'nanoid';

@Injectable()
export class CreateAppService extends ReadAppService {
  async create(dto: CreateShortLinkDto): Promise<CreateShortLinkResult> {
    const shortLink = nanoid.customAlphabet(
      'abcdefjhijklmnpqrstuvwxyz1234567890',
    )();
    const link = await this.linksModel.create({
      ID: new mongoose.Types.ObjectId(),
      longLink: dto.url,
      shortLink,
    });

    await link.save();
    await this.redis.setexValue(
      link.shortLink,
      link.longLink,
      1000 * 60 * 60 * 24 * 7,
    ); // 7 days

    return {
      id: link.id,
      shortLink,
    };
  }
}
