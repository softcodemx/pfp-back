import { Prisma } from "@prisma/client";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePersonDto } from "../people/dto/update-person.dto";

export abstract class UsersAbstract {
  abstract create(createUserDto: CreateUserDto): Promise<UpdateUserDto>;
  abstract findOne(
    userWhereUniqueInput: Prisma.usersWhereUniqueInput,
  ): Promise<UpdateUserDto | null>;
  abstract findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.usersWhereUniqueInput;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput;
  }): Promise<UpdateUserDto[]>;
  abstract update(params: {
    where: Prisma.usersWhereUniqueInput;
    data: UpdateUserDto;
  }): Promise<UpdateUserDto>;
  abstract remove(where: Prisma.usersWhereUniqueInput): Promise<UpdateUserDto>;
}