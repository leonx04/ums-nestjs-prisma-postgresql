import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { Role } from "generated/prisma";

export class CreateUserDTO {
    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty({ example: 'johndoe@gmail.com', description: 'The email of the user' })
    @IsString()
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({ example: 'Password@1', description: 'The password of the user' })
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password: string;

    @ApiProperty({ example: 'John', description: 'The first name of the user' })
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
    lastName: string;

    @ApiProperty({ example: '+1234567890', description: 'The phone number of the user' })
    @IsString()
    @IsNotEmpty({ message: 'Phone number is required' })
    phone: string;

    @ApiProperty({
        example: Role.USER,
        description: 'The role of the user',
        enum: Role
    })
    role?: Role;
}