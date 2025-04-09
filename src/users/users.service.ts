import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from 'generated/prisma';
import * as bcrypt from 'bcrypt';

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

    async create(data: CreateUserDTO) : Promise<User> {
        data.password =  await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: data
        });
    }

}
