import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as momentTimezone from 'moment-timezone';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// momentTimezone.tz.setDefault('America/Sao_Paulo');

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		})
	);

	useContainer(app.select(AppModule), { fallbackOnErrors: true });

	const config = new DocumentBuilder()
		.setTitle('OwlPartners')
		.setDescription('OwlPartners Service')
		.setVersion('1.0')
		.addTag('owlPartners')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}
bootstrap();
