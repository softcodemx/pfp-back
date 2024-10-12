import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    //Verificamos si el restarurante existe
    const existingRestaurant = await this.prismaService.restaurants.findFirst({
      where: { 
        name: createRestaurantDto.name,
      },
    });

    //Si existe, lanzamos una excepción
    if (existingRestaurant) {
      throw new HttpException ('This name restaurant already exists. Please check that the content of this field does not repeat', HttpStatus.CONFLICT);
    }

    //Si no existe. Se crea el restaurante
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
    return this.prismaService.restaurants.update({
      where,
      data: {
        deletedAt: new Date(), // Establece la fecha y hora actual para la eliminación lógica
      },
    });
  } 

  async uploapPicture() {
    return 'Imagen subida';
  }
}
