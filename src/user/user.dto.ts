import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  email: string;
  @IsString()
  @IsDefined()
  @ApiProperty()
  password: string;
}

export class LoginDto extends CreateUserDto {}
export class CheckDto {
  jwt: string;
}
