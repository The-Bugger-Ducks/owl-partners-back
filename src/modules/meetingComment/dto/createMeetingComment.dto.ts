import { IsNotEmpty, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateMeetingCommentDTO {
	@IsNotEmpty({ message: 'O título(title) da reunião precisa ser informado' })
	@ApiProperty()
	comment: string;

	@IsNotEmpty({ message: 'O id da reunião(meetingId) precisa ser informado' })
	@IsUUID(undefined, { message: 'A estrutura do id da reunião(meetingId) precisa ser de UUID' })
	@ApiProperty()
	meetingId: string;

	@IsNotEmpty({ message: 'O id do usuário(userId) precisa ser informado' })
	@IsUUID(undefined, { message: 'A estrutura do id do usuário(userId) precisa ser de UUID' })
	@ApiProperty()
	userId: string;
}
