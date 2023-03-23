import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailIsUnique } from "../validation/email-is-unique.validator";
import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "../enums/role.enum";

export class CreateUserDTO {
	@IsNotEmpty({ message: 'O nome não pode ser vazio.' })
	@ApiProperty()
	name: string;

	@IsNotEmpty({ message: 'O nome não pode ser vazio.' })
	@ApiProperty()
	lastName: string;

	@IsEmail(undefined, { message: 'o e-mail informado é invalido' })
	@EmailIsUnique({ message: 'O e-mail informado já existe.' })
	@ApiProperty()
	email: string;

	@MinLength(4, { message: 'A senha deve conter pelo menos 4 caracteres' })
	@ApiProperty()
	password: string;

	@ApiProperty()
	@IsOptional()
	@IsEnum(RoleEnum, { message: "O privilégio(role) deve ser 'ADMIN' ou 'SIMPLE'." })
	role: RoleEnum;
}
