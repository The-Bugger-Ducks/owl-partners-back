import { IsEnum, IsNotEmpty } from "class-validator"
import { CommentType } from "../enums/CommentType.enum"
import { ApiProperty } from "@nestjs/swagger"

export class CreateCommentDTO {

  @IsNotEmpty({ message: 'O id do parceiro(partnerID) precisa ser fornecido.' })
  @ApiProperty()
  partnerId: string

  @IsNotEmpty({ message: 'O id do usuário(userID) precisa ser fornecido' })
  @ApiProperty()
  userId: string

  @IsNotEmpty({ message: 'O id do usuário(userID) precisa ser fornecido' })
  @ApiProperty()
  comment: string

  @IsNotEmpty({ message: 'O tipo do comentário(commentType) deve ser fornecido.' })
  @IsEnum(CommentType, { message: "O tipo do comentario(commentType) deve ser 'ATUALIZACAO' ou 'ANOTACAO'." })
  @ApiProperty()
  commentType: CommentType
}