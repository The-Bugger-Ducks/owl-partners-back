import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailIsUnique } from "../validation/email-is-unique.validator";
import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "../enums/role.enum";

export class UpdateUserDTO {
	@IsOptional()
	@ApiProperty()
	name: string;

	@IsOptional()
	@ApiProperty()
	lastName: string;

	@IsOptional()
	@IsEmail(undefined, { message: 'o e-mail informado é invalido' })
	@EmailIsUnique({ message: 'O e-mail informado já existe.' })
	@ApiProperty()
	email: string;

	@IsOptional()
	@MinLength(4, { message: 'A senha deve conter pelo menos 4 caracteres' })
	@ApiProperty()
	password: string;

	@IsOptional()
	@IsEnum(RoleEnum, { message: "O privilégio(role) deve ser 'ADMIN' ou 'SIMPLE'." })
	@ApiProperty()
	role: RoleEnum;
}
