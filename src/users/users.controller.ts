import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @UseGuards(JwtAuthGuard)

    @Get()
    index() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async show(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Get('email/:email')
    finByEmail(@Param('email') email: string) {
        return this.usersService.findByEmail(email);
    }

    @Post('create')
    async create(@Body() data: CreateUserDTO) {
        return this.usersService.create(data);
    }

    @Post('create-admin')
    async createAdmin(@Body() data: CreateUserDTO) {
        return this.usersService.createAdminAccount(data);
    }

    @Put('update/:id')
    async update(@Param('id') id: string, @Body() data: UpdateUserDTO) {
        return this.usersService.update(+id, data);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string) {
        return this.usersService.delete(+id);
    }
}
