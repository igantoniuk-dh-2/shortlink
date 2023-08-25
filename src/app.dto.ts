import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsUrl } from 'class-validator';

export class CreateShortLinkDto {
  @IsDefined()
  @IsString()
  @IsUrl()
  @ApiProperty()
  url: string;
}

export class DeleteShortLinkDto {
  @IsDefined()
  @IsString()
  id: string;
}

export class ReadShortLinkDto {
  @IsDefined()
  @IsString()
  shortLink: string;
}
