import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @ApiProperty({ description: 'User email address' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'User password' })
  password: string;
}
