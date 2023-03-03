import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailIsUnique } from "../validation/email-is-unique.validator";

export class CreateUserDTO {

  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  name: string;

  @IsEmail(undefined, { message: 'o e-mail informado é invalido' })
  @EmailIsUnique({ message: 'O e-mail informado já existe.' })
  email: string;

  @MinLength(6, { message: 'A senha deve conter pelo menos 6 caracteres' })
  password: string;
}