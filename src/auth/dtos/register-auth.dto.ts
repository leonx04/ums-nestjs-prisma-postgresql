import { OmitType } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';

export class RegisterAuthDto extends OmitType(CreateUserDTO, ['role'] as const) { }
// Trừ role ra khỏi CreateUserDTO
// Chỉ cần kế thừa OmitType và truyền vào CreateUserDTO và các thuộc tính muốn loại bỏ