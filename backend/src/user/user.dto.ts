import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;
  @IsString()
  @IsDefined()
  @ApiProperty()
  @Length(8)
  password: string;
}

export class LoginDto extends CreateUserDto {}
export class CheckDto {
  jwt: string;
}
