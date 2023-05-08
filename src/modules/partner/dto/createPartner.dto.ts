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
import { ApiProperty } from '@nestjs/swagger';

export class CreatePartnerDTO {
	@IsNotEmpty({ message: 'O nome não pode ser vazio.' })
	@ApiProperty()
	name: string;

	@IsEmail(undefined, { message: 'o e-mail informado é invalido' })
	@IsOptional()
	@ApiProperty()
	email: string;

	@MaxLength(15, { message: 'O telefone deve conter no máximo 14 caracteres' })
	@MinLength(8, { message: 'O telefone deve conter pelo menos 8 caracteres' })
	@IsOptional()
	@ApiProperty()
	phoneNumber: string;

	@MaxLength(8, { message: 'O CEP deve conter 8 caracteres' })
	@IsOptional()
	@ApiProperty()
	zipCode: string;

	@IsOptional()
	@ApiProperty()
	state: string;

	@IsOptional()
	@ApiProperty()
	city: string;

	@IsOptional()
	@ApiProperty()
	neighborhood: string;

	@IsOptional()
	@ApiProperty()
	address: string;

	@IsOptional()
	@ApiProperty()
	classification: PartnerClassification;

	@IsNotEmpty({ message: 'O status não pode ser vazio.' })
	@ApiProperty()
	status: PartnerStatus;

	@IsNumber()
	@IsOptional()
	@ApiProperty()
	memberNumber: number;
}
