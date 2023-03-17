import { IsEnum, IsNotEmpty } from "class-validator"
import { CommentType } from "../enums/CommentType.enum"

export class UpdateCommentDTO {

  @IsNotEmpty({ message: 'O id do parceiro(partnerID) precisa ser fornecido.' })
  partnerId: string

  @IsNotEmpty({ message: 'O id do usuário(userID) precisa ser fornecido' })
  userId: string

  @IsNotEmpty({ message: 'O id do usuário(userID) precisa ser fornecido' })
  comment: string

  @IsNotEmpty({ message: 'O tipo do comentário(commentType) deve ser fornecido.' })
  @IsEnum(CommentType, { message: "O tipo do comentario(commentType) deve ser 'ATUALIZACAO' ou 'ANOTACAO'." })
  commentType: CommentType
}