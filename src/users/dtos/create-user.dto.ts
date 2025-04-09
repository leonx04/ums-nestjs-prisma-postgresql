import { Role } from "generated/prisma";

export class CreateUserDTO{
    name: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    role?: Role;
}