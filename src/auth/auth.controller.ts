import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dtos/register-auth.dto';
import { LoginAuthDto } from './dtos/login-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() dtoRegister: RegisterAuthDto) {
        return this.authService.register(dtoRegister);
    }
    @Post('login')
    async login(@Body() dtoLogin: LoginAuthDto) {
        return this.authService.login(dtoLogin);
    }
}
