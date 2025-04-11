import { Injectable } from '@nestjs/common';
import { Project } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dtos/create-project.dto';

@Injectable()
export class ProjectsService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllProjects() : Promise<Project[]> {
        return await this.prisma.project.findMany();
    }

    async getProjectById(id: number): Promise<Project | null> {
        return await this.prisma.project.findUnique({
            where: { id },
        });
    }

    async createProject(data: CreateProjectDto): Promise<Project> {
        return await this.prisma.project.create({
            data: data
        });
    }

    

}