import * as bcrypt from 'bcrypt';

import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { PrismaService } from '../../database';

const saltOrRounds = 10;

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) { }

	findAll() {
		return this.prismaService.user.findMany();
	}

	async findById(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			}
		});

		if (user === null) throw new NotFoundException('Usuário não encontrado');
		return user
	}

	async findByName(name: string) {
		return await this.prismaService.user.findMany({
			where: {
				OR: [
					{
						name: { contains: name, mode: 'insensitive' },
					},
					{
						lastName: { contains: name, mode: 'insensitive' }
					}
				],
			},
			orderBy: {
				name: 'asc',
			},
		});
	}

	async create(user: CreateUserDTO) {
		const hash = await bcrypt.hash(user.password, saltOrRounds);
		user.password = hash;

		return this.prismaService.user.create({
			data: user,
		});
	}

	async update(user: UpdateUserDTO, id: string) {
		if (user.password) {
			const hash = await bcrypt.hash(user.password, saltOrRounds);
			user.password = hash;
		}

		const userUpdated = this.prismaService.user.update({
			data: user,
			where: {
				id,
			},
		});

		return userUpdated
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
