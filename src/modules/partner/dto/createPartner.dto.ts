import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

import { PartnerClassification } from '../enums/PartnerClassification';
import { PartnerStatus } from '../enums/PartnerStatus';

export class CreatePartnerDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  name: string;

  @IsEmail(undefined, { message: 'o e-mail informado é invalido' })
  @IsOptional()
  email: string;

  @MaxLength(14, { message: 'O telefone deve conter no máximo 14 caracteres' })
  @MinLength(8, { message: 'O telefone deve conter pelo menos 8 caracteres' })
  @IsOptional()
  phoneNumber: string;

  @MaxLength(8, { message: 'O CEP deve conter 8 caracteres' })
  @IsOptional()
  zipCode: string;

  @IsOptional()
  state: string;

  @IsOptional()
  city: string;

  @IsOptional()
  neighborhood: string;

  @IsOptional()
  address: string;

  @IsOptional()
  classification: PartnerClassification;

  @IsNotEmpty({ message: 'O status não pode ser vazio.' })
  status: PartnerStatus;

  @IsNumber()
  @IsOptional()
  memberNumber: number;
}
