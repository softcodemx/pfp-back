import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

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
  findAll(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc'
  ) {
    const or = search
      ? {
          OR: [
            { name: { contains: search } },
            { gps: { contains: search } },
            { is_pet_frendly: { equals: search === "true" } },
          ],
        }
      : undefined;

    return this.restaurantsService.findAll({
      skip: skip || undefined,
      take: take || undefined,
      where: { ...or },
      orderBy: {
        id_restaurant: orderBy ? orderBy : 'desc',
      },
    });
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
