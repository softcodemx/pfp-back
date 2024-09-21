import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// DTO's
import { UpdateUserDto } from './dto/update-user.dto';

// Services
import { PrismaService } from 'src/db/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async create(createUserDto: Prisma.usersCreateInput): Promise<UpdateUserDto> {
    const saltOrRounds = 10;
    createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    return this.prismaService.users.create({
      data: createUserDto,
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
      where,
      orderBy,
    });
  }

  async findOne(
    userWhereUniqueInput: Prisma.usersWhereUniqueInput,
  ): Promise<UpdateUserDto | null> {
    return this.prismaService.users.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.usersWhereUniqueInput;
    data: Prisma.usersUpdateInput;
  }): Promise<UpdateUserDto> {
    const {
      where,
      data,
    } = params;
    return this.prismaService.users.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.usersWhereUniqueInput): Promise<UpdateUserDto> {
    return this.prismaService.users.delete({
      where,
    });
  }
}
