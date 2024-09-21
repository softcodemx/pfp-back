import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-restaurant.dto';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  id_restaurant: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
