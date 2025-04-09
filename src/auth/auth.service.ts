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

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);
        return { access_token: token };
    }

}
