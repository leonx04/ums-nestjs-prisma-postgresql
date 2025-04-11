import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Status } from "generated/prisma";

export class CreateProjectDto {
    @ApiProperty({ example: 'Project Name', description: 'The name of the project' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Project Description', description: 'The description of the project' })
    @IsString()
    description: string;

    @ApiProperty({ example: '2025-04-01', description: 'The start date of the project' })
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @ApiProperty({ example: '2026-10-31', description: 'The end date of the project' })
    @Type(() => Date)
    @IsDate()
    endDate: Date;

    @ApiProperty({ example: 'PENDING', description: 'The status of the project' })
    @IsOptional()
    @IsEnum(Status)
    status?: Status;
    @ApiProperty({ example: 1, description: 'The ID of the user who created the project' })
    @IsNumber()
    userId: number
}