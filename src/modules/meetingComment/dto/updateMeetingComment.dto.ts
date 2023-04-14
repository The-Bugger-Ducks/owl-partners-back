import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateMeetingCommentDTO {
	@IsNotEmpty({ message: 'O comentário(comment) da reunião precisa ser informado' })
	@ApiProperty()
	comment: string;
}
