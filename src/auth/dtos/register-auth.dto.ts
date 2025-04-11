import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterAuthDto {
    @IsNotEmpty()
    @ApiProperty({ description: 'User name' })
    name: string;
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'User email address' })
    email: string;

    @MinLength(6)
    @ApiProperty({ description: 'User password' })
    password: string;

    @ApiProperty({ description: 'User first name' })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ description: 'User last name' })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ description: 'User phone number' })
    @IsNotEmpty()
    phone: string;
}
