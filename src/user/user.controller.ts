import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { ListUsersDTO } from "./dto/ListUsers.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";

@Controller('/users')
export class UserController {

  constructor(private userRepository: UserRepository) { }

  @Post()
  async CreateUser(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.id = uuid();
    userEntity.email = userData.email;
    userEntity.name = userData.name;
    userEntity.password = userData.password;

    this.userRepository.save(userEntity);

    return {
      user: new ListUsersDTO(userEntity.id, userEntity.name),
      message: 'Usuário criado com sucesso!'
    };
  }

  @Get()
  async listUsers() {
    const usersSaved = await this.userRepository.list();
    const listUsers = usersSaved.map(
      user => new ListUsersDTO(
        user.id,
        user.name,
      )
    );

    return listUsers;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() dataToUpdate: UpdateUserDTO) {
    const userUpdated = await this.userRepository.update(id, dataToUpdate);
    return {
      user: userUpdated,
      message: 'Usuário Atualizado com sucesso.'
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const userDeleted = await this.userRepository.delete(id);

    return {
      user: userDeleted,
      message: 'Usuário removido com sucesso.'
    }
  }
}