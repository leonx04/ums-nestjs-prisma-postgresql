import { ApiProperty } from "@nestjs/swagger";
import { Role } from "generated/prisma";

export class UpdateUserDTO{
    @ApiProperty({example: 'John Doe', description: 'The name of the user'})
    name?: string;
    @ApiProperty({example: 'johndoe@gmail.com', description: 'The email of the user'})
    email?: string;
    @ApiProperty({example: 'password123', description: 'The password of the user'})
    password?: string;
    @ApiProperty({example: 'John', description: 'The first name of the user'})
    firstName?: string;
    @ApiProperty({example: 'Doe', description: 'The last name of the user'})
    lastName?: string;
    @ApiProperty({example: '+1234567890', description: 'The phone number of the user'})
    phone?: string;
    @ApiProperty({
        example: Role.USER,
        description: 'The role of the user',
        enum: Role 
    })
    @ApiProperty({example: 'USER', description: 'The role of the user'})
    role?: Role
}