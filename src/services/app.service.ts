import { Injectable } from '@nestjs/common';
import { DeleteAppService } from './delete-app.service';

@Injectable()
export class AppService extends DeleteAppService {}
