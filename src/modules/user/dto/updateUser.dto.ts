import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailIsUnique } from "../validation/email-is-unique.validator";

export class UpdateUserDTO {

  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'o e-mail informado é invalido' })
  @EmailIsUnique({ message: 'O e-mail informado já existe.' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha deve conter pelo menos 6 caracteres' })
  @IsOptional()
  password: string;
}