import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { Injectable, NotFoundException } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { PrismaService } from "src/infra/database/prisma/prisma.service";

@Injectable()
export class UserRepository {
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

  userExists(email: string): boolean {
    const userFound = this.prismaService.user.findUnique({ where: { email: email } });
    return userFound === undefined;
  }

  async create(input: Prisma.UserCreateInput) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(input.password, saltOrRounds);
    input.password = hash;

    return this.prismaService.user.create({
      data: input,
    });
  }

  update(input: Prisma.UserUpdateInput, id: string) {
    return this.prismaService.user.update({
      data: input,
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
}