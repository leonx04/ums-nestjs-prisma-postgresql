import { PickType } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';

export class LoginAuthDto extends PickType(CreateUserDTO, ['email', 'password'] as const) { }
// Chỉ cần kế thừa PickType và truyền vào CreateUserDTO và các thuộc tính muốn lấy
// Chỉ lấy email và password từ CreateUserDTO