import { IsDate, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateMeetingDTO {
	@IsNotEmpty({ message: 'O título(title) da reunião precisa ser informado' })
	@ApiProperty()
	title: string;

	@IsOptional()
	@ApiProperty()
	description: string;

	@IsNotEmpty({ message: 'A data e hora(meetingDateTime) da reunião precisa ser informada' })
	@IsDateString()
	meetingDateTime: Date
}
