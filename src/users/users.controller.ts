import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiExcludeEndpoint, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiResponse({status: 401, description: 'Unauthorized'})
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Get all users success' })
    index() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    @ApiParam({ name: 'id', type: 'string', description: 'UserID' })
    @ApiResponse({ status: 200, description: 'Get data Users width User ID success' })
    async show(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Get('email/:email')
    @ApiOperation({ summary: 'Get user by email' })
    @ApiParam({ name: 'email', type: 'string' })
    @ApiResponse({ status: 200, description: 'Get data Users width Email User success' })
    finByEmail(@Param('email') email: string) {
        return this.usersService.findByEmail(email);
    }

    @Post('create')
    @ApiOperation({ summary: 'Create a new user data' })
    @ApiBody({ type: CreateUserDTO })
    @ApiCreatedResponse({ description: 'Create user success (User role)' })
    async create(@Body() data: CreateUserDTO) {
        return this.usersService.create(data);
    }

    @Post('create-admin')
    @ApiOperation({ summary: 'Create a new admin user data' })
    @ApiBody({ type: CreateUserDTO })
    @ApiCreatedResponse({ description: 'Create admin user success' })
    @ApiExcludeEndpoint()
    async createAdmin(@Body() data: CreateUserDTO) {
        return this.usersService.createAdminAccount(data);
    }

    @Put('update/:id')
    @ApiOperation({ summary: 'Update user data by id' })
    @ApiParam({ name: 'id', type: 'string' })
    @ApiResponse({ status: 200, description: 'Update user success' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiBody({ type: UpdateUserDTO })
    async update(@Param('id') id: string, @Body() data: UpdateUserDTO) {
        const user = await this.usersService.findOne(+id);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return this.usersService.update(+id, data);
    }

    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete user data by id' })
    @ApiParam({ name: 'id', type: 'string' })
    @ApiResponse({ status: 200, description: 'Delete user success' })
    async delete(@Param('id') id: string) {
        return this.usersService.delete(+id);
    }
}
