import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dtos/register-auth.dto';
import { LoginAuthDto } from './dtos/login-auth.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiBody({ type: RegisterAuthDto })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    async register(@Body() dtoRegister: RegisterAuthDto) {
        return this.authService.register(dtoRegister);
    }
    @Post('login')
    @ApiOperation({ summary: 'Login a user' })
    @ApiBody({ type: LoginAuthDto })
    @ApiResponse({ status: 200, description: 'User logged in successfully' })
    async login(@Body() dtoLogin: LoginAuthDto) {
        return this.authService.login(dtoLogin);
    }
}
