import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// DTO's
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

// Services
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async create(createRestaurantDto: Prisma.restaurantsCreateInput): Promise<UpdateRestaurantDto> {
    return this.prismaService.restaurants.create({
      data: createRestaurantDto,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.restaurantsWhereUniqueInput;
    where?: Prisma.restaurantsWhereInput;
    orderBy?: Prisma.restaurantsOrderByWithRelationInput;
  }): Promise<UpdateRestaurantDto[]> {
    const {
      skip,
      take,
      cursor,
      where,
      orderBy,
    } = params;
    return this.prismaService.restaurants.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    restaurantsWhereUniqueInput: Prisma.restaurantsWhereUniqueInput,
  ): Promise<UpdateRestaurantDto | null> {
    return this.prismaService.restaurants.findUnique({
      where: restaurantsWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.restaurantsWhereUniqueInput;
    data: Prisma.restaurantsUpdateInput;
  }): Promise<UpdateRestaurantDto> {
    const {
      where,
      data,
    } = params;
    return this.prismaService.restaurants.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.restaurantsWhereUniqueInput): Promise<UpdateRestaurantDto> {
    return this.prismaService.restaurants.delete({
      where,
    });
  }
}
