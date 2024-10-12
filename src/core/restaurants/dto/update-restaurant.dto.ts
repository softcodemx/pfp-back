import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsNotEmpty, IsDate, IsOptional, IsString } from 'class-validator';

// DTO's
import { CreateRestaurantDto } from './create-restaurant.dto';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @IsNumber()
  @IsNotEmpty()
  id_restaurant: number;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsDate()
  deletedAt: Date;

  @IsString()
  @IsOptional() // The field 'photo' is optional
  photo?: string;
}
