import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { CreateUserDTO } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { ListUsersDTO } from "./dto/ListUsers.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { UserRepository } from "./user.repository";

@Controller('/users')
export class UserController {

  constructor(private userRepository: UserRepository) { }

  @Post()
  async CreateUser(@Body() userData: CreateUserDTO) {
    return this.userRepository.create(userData);
  }

  @Get()
  async index() {
    const users = this.userRepository.findAll();
    return users;
  }

  // @Put('/:id')
  // async updateUser(@Param('id') id: string, @Body() dataToUpdate: UpdateUserDTO) {
  //   const userUpdated = await this.userRepository.update(id, dataToUpdate);
  //   return {
  //     user: userUpdated,
  //     message: 'Usuário Atualizado com sucesso.'
  //   }
  // }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const userFound = await this.userRepository.findById(id);
    if (userFound === null) throw new NotFoundException('Usuário não encontrado.')

    return { message: 'Usuário removido com sucesso.' }
  }
}