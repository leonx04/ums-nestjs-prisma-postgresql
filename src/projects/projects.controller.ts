import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateProjectDto } from './dtos/create-project.dto';
@ApiTags('Projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all projects' })
    @ApiResponse({ status: 200, description: 'Get all projects success' })
    index() {
        return this.projectsService.getAllProjects();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get project by ID' })
    @ApiResponse({ status: 200, description: 'Get project success' })
    @ApiResponse({ status: 404, description: 'Project not found' })
    async show(@Param('id') id: number) {
        const project = await this.projectsService.getProjectById(+id);
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        return this.projectsService.getProjectById(+id);
    }

    @Post('create')
    @ApiOperation({ summary: 'Create a new project' })
    @ApiCreatedResponse({ description: 'Project created successfully' })
    create(@Body() data: CreateProjectDto) {
        return this.projectsService.createProject(data);
    }
}
