import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';

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

    @Put('update/:id')
    async update(@Param('id') id: string,  @Body() data : UpdateUserDTO) {
        return this.usersService.update(+id, data);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string) {
        return this.usersService.delete(+id);
    }
}
