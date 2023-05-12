import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { UpdateUserDTO } from "./dto/updateUser.dto";

@Controller('/users')
@ApiTags('users')
export class UserController {

	constructor(private userService: UserService) { }

	@Post()
	@UseGuards(AuthGuard('jwt'))
	async CreateUser(@Body() userData: CreateUserDTO) {
		return this.userService.create(userData);
	}

	@Get()
	@UseGuards(AuthGuard('jwt'))
	async index() {
		const users = this.userService.findAll();
		return users;
	}

	@Get('/:id')
	@UseGuards(AuthGuard('jwt'))
	async show(@Param('id') id: string,) {
		const users = this.userService.findById(id);
		return users;
	}

	@Put('/:id')
	@UseGuards(AuthGuard('jwt'))
	async updateUser(@Param('id') id: string, @Body() dataToUpdate: UpdateUserDTO) {
		const userUpdated = await this.userService.update(dataToUpdate, id);
		return {
			user: userUpdated,
			message: 'Usuário Atualizado com sucesso.'
		}
	}

	@Delete('/:id')
	@UseGuards(AuthGuard('jwt'))
	async deleteUser(@Param('id') id: string) {
		const userFound = await this.userService.findById(id);
		if (userFound === null) throw new NotFoundException('Usuário não encontrado.')

		return this.userService.delete(id);
	}
}
