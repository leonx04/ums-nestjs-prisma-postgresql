import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from 'generated/prisma';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService ) {}

    findAll() : Promise<any[]> {
        return this.prisma.user.findMany();
    }

    findOne(id: number) : Promise<any> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    create(data: CreateUserDTO) : Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

}
