import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { Role, User } from 'generated/prisma';
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    findOne(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    async create(data: CreateUserDTO): Promise<User> {
        data.password = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: data
        });
    }

    async update(id: number, data: UpdateUserDTO): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data: data
        });
    }

    async delete(id: number): Promise<User> {
        return this.prisma.user.delete({
            where: { id }
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async createAdminAccount(createUserDTO: CreateUserDTO): Promise<User> {
        createUserDTO.password = await bcrypt.hash(createUserDTO.password, 10);
        return this.prisma.user.create({
            data: {
                ...createUserDTO,
                role: Role.ADMIN,
            }
        });
    }
}
