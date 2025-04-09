import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    index(){
        return this.usersService.findAll();
    }
    @Post('create')
    async create(@Body() data : CreateUserDTO) {
        return this.usersService.create(data);
    }
}
