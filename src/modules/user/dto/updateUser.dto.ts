import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailIsUnique } from "../validation/email-is-unique.validator";
import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "../enums/role.enum";

export class UpdateUserDTO {

	@IsNotEmpty({ message: 'O nome não pode ser vazio.' })
	@IsOptional()
	@ApiProperty()
	name: string;

	@IsNotEmpty({ message: 'O nome não pode ser vazio.' })
	@IsOptional()
	@ApiProperty()
	lastName: string;

	@IsEmail(undefined, { message: 'o e-mail informado é invalido' })
	@EmailIsUnique({ message: 'O e-mail informado já existe.' })
	@IsOptional()
	@ApiProperty()
	email: string;

	@MinLength(6, { message: 'A senha deve conter pelo menos 6 caracteres' })
	@IsOptional()
	@ApiProperty()
	password: string;


	@ApiProperty()
	@IsOptional()
	@IsEnum(RoleEnum, { message: "O privilégio(role) deve ser 'ADMIN' ou 'SIMPLE'." })
	role: RoleEnum;
}
