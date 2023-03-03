import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  private findById(id: string) {
    const userFound = this.users.find(
      userSaved => userSaved.id === id
    );

    if (!userFound) throw new Error('Usuário não encontrado!');

    return userFound;
  }

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  async userExists(email: string): Promise<boolean> {
    const userFind = this.users.find(
      user => user.email === email
    )

    return userFind !== undefined;
  }

  async update(id: string, dataToUpdate: Partial<UserEntity>) {
    const user = this.findById(id);

    Object.entries(dataToUpdate).forEach(([key, value]) => {
      if (key === id) return;
      user[key] = value;
    });

    return user;
  }

  async delete(id: string) {
    const user = this.findById(id);
    this.users = this.users.filter(
      userSaved => userSaved.id !== id
    );

    return user;
  }
}