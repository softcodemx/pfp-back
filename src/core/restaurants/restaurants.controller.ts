import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// DTO's
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

// Services
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.restaurantsWhereUniqueInput;
    where?: Prisma.restaurantsWhereInput;
    orderBy?: Prisma.restaurantsOrderByWithRelationInput;
  }) {
    return this.restaurantsService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.restaurantsService.findOne({id_restaurant: id});
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantsService.update({
      where: { id_restaurant: id },
      data: {
        ...updateRestaurantDto,
      }
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.restaurantsService.remove({
      id_restaurant: id,
    });
  }
}
