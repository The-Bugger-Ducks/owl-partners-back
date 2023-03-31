import { IsEnum, IsNotEmpty, IsOptional } from "class-validator"
import { CommentType } from "../enums/CommentType.enum"
import { ApiProperty } from "@nestjs/swagger"

export class CreateCommentDTO {

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
