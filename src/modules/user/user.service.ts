import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { PrismaService } from '../../database';

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) { }

	findAll() {
		return this.prismaService.user.findMany();
	}

	async findById(id: string) {
		return this.prismaService.user.findUnique({
			where: {
				id
			}
		});
	}

	async create(user: CreateUserDTO) {
		const saltOrRounds = 10;
		const hash = await bcrypt.hash(user.password, saltOrRounds);
		user.password = hash;

		return this.prismaService.user.create({
			data: user,
		});
	}

	update(user: UpdateUserDTO, id: string) {
		return this.prismaService.user.update({
			data: user,
			where: {
				id,
			},
		});
	}

	delete(id: string) {
		return this.prismaService.user.delete({
			where: {
				id: id,
			},
		});
	}

	userExists(email: string): boolean {
		const userFound = this.prismaService.user.findUnique({ where: { email: email } });
		return userFound === undefined;
	}

	findUserByEmail(email: string) {
		const userFound = this.prismaService.user.findUnique({ where: { email: email } });

		if (!userFound) throw new NotFoundException('Usuário não encontrado');
		return userFound;
	}

}
