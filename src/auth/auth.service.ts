import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterAuthDto } from './dtos/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dtos/login-auth.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async register(dtoRegister: RegisterAuthDto) {
        const existingUser = await this.prisma.user.findUnique({ where: { email: dtoRegister.email } });
        if (existingUser) {
            throw new Error('Email already registered');
        }
        const existingPhone = await this.prisma.user.findUnique({ where: { phone: dtoRegister.phone } });
        if (existingPhone) {
            throw new Error('Phone already registered');
        }
        dtoRegister.password = await bcrypt.hash(dtoRegister.password, 10);
        const user = await this.prisma.user.create({
            data: {
                ...dtoRegister
            },
        });

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async login(dtoLogin: LoginAuthDto) {
        const user = await this.prisma.user.findUnique({ where: { email: dtoLogin.email } });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(dtoLogin.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid account or password');
        }

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);
        return { access_token: token };
    }

    

}
