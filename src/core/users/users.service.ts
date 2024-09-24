import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// DTO's
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

// Services
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UpdateUserDto> {
    const {people, ...rest} = createUserDto;
    const saltOrRounds = 10;
    createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    return this.prismaService.users.create({
      data: {
        ...rest,
        people: {},
      },
      include: {people: true},
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.usersWhereUniqueInput;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput;
  }): Promise<UpdateUserDto[]> {
    const {
      skip,
      take,
      cursor,
      where,
      orderBy,
    } = params;
    return this.prismaService.users.findMany({
      skip,
      take,
      cursor,
      where: {
        ...where,  // Incluye cualquier otra condición que se pase en 'where'
        active: true,  // Filtrar solo los usuarios activos
        deletedAt: null,  // Asegurarse de que no estén eliminados
      },
      include: {people: true},
      orderBy,
    });
  }

  async findOne(
    userWhereUniqueInput: Prisma.usersWhereUniqueInput,
  ): Promise<UpdateUserDto | null> {
    return this.prismaService.users.findUnique({
      where: userWhereUniqueInput,
      include: {people: true},
    });
  }

  async update(params: {
    where: Prisma.usersWhereUniqueInput;
    data: UpdateUserDto;
  }): Promise<UpdateUserDto> {
    const {
      where,
      data,
    } = params;
    const { people, ...rest } = data;
    return this.prismaService.users.update({
      where,
      data: {
        ...rest,
        people: {},
      },
      include: {people: true},
    });
  }

  async remove(where: Prisma.usersWhereUniqueInput): Promise<UpdateUserDto> {
    return this.prismaService.users.delete({
      where,
    });
  }
}
