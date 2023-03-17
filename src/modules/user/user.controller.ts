import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { CreateUserDTO } from "./dto/createUser.dto";
import { ListUsersDTO } from "./dto/ListUsers.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('/users')
export class UserController {

  constructor(private userService: UserService) { }

  @Post()
  async CreateUser(@Body() userData: CreateUserDTO) {
    return this.userService.create(userData);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async index() {
    const users = this.userService.findAll();
    return users;
  }

  // @Put('/:id')
  // @UseGuards(AuthGuard('jwt'))
  // async updateUser(@Param('id') id: string, @Body() dataToUpdate: UpdateUserDTO) {
  //   const userUpdated = await this.userService.update(id, dataToUpdate);
  //   return {
  //     user: userUpdated,
  //     message: 'Usuário Atualizado com sucesso.'
  //   }
  // }

  @Delete('/:id')
  // @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('id') id: string) {
    const userFound = await this.userService.findById(id);
    if (userFound === null) throw new NotFoundException('Usuário não encontrado.')

    return { message: 'Usuário removido com sucesso.' }
  }
}