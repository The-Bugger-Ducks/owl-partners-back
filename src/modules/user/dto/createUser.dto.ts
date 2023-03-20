import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailIsUnique } from "../validation/email-is-unique.validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @ApiProperty()
  name: string;

  @IsEmail(undefined, { message: 'o e-mail informado é invalido' })
  @EmailIsUnique({ message: 'O e-mail informado já existe.' })
  @ApiProperty()
  email: string;

  @MinLength(6, { message: 'A senha deve conter pelo menos 6 caracteres' })
  @ApiProperty()
  password: string;
}