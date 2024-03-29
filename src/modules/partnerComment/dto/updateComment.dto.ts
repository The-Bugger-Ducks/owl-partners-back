import { IsNotEmpty, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateCommentDTO {

	@IsNotEmpty({ message: 'O id do parceiro(partnerID) precisa ser fornecido.' })
	@ApiProperty()
	partnerId: string

	// @IsNotEmpty({ message: 'O id do usuário(userID) precisa ser fornecido' })
	@IsOptional()
	@ApiProperty()
	userId: string

	@IsNotEmpty({ message: 'O comentário sobre a parceria(comment) precisa ser fornecido' })
	@ApiProperty()
	comment: string
}
