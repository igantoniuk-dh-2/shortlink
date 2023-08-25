import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Link } from 'src/links.schema';
import { RedisProvider } from 'src/redis/redis.provider';

@Injectable()
export class BaseAppService {
  constructor(
    @InjectModel(Link.name) protected readonly linksModel: Model<Link>,
    protected readonly redis: RedisProvider,
  ) {
    // ...
  }
}
