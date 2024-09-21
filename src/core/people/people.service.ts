import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// DTO's
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

// Services
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class PeopleService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async create(createPersonDto: Prisma.peopleCreateInput): Promise<UpdatePersonDto> {
    return this.prismaService.people.create({
      data: createPersonDto,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.peopleWhereUniqueInput;
    where?: Prisma.peopleWhereInput;
    orderBy?: Prisma.peopleOrderByWithRelationInput;
  }): Promise<UpdatePersonDto[]> {
    const {
      skip,
      take,
      cursor,
      where,
      orderBy,
    } = params;
    return this.prismaService.people.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    peopleWhereUniqueInput: Prisma.peopleWhereUniqueInput,
  ): Promise<UpdatePersonDto | null> {
    return this.prismaService.people.findUnique({
      where: peopleWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.peopleWhereUniqueInput;
    data: Prisma.peopleUpdateInput;
  }): Promise<UpdatePersonDto> {
    const {
      where,
      data,
    } = params;
    return this.prismaService.people.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.peopleWhereUniqueInput): Promise<UpdatePersonDto> {
    return this.prismaService.people.delete({
      where,
    });
  }
}
