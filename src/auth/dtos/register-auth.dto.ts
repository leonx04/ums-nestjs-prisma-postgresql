import { OmitType } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';

export class RegisterAuthDto extends OmitType(CreateUserDTO, ['role'] as const) { }
