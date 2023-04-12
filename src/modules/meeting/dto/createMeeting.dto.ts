import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateMeetingDTO {
	@IsNotEmpty({ message: 'O título(title) da reunião precisa ser informado' })
	@ApiProperty()
	title: string;

	@IsNotEmpty({ message: 'O id da parceria(partnerId) da reunião precisa ser informado' })
	@IsUUID(undefined, { message: 'A estrutura do id da parceria(partnerId) precisa ser de UUID' })
	@ApiProperty()
	partnerId: string;

	@IsOptional()
	@ApiProperty()
	description: string;

	@IsNotEmpty({ message: 'A data e hora(meetingDateTime) da reunião precisa ser informada' })
	@IsDateString()
	meetingDateTime: Date
}
