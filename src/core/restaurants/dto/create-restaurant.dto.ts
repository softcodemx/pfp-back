import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  gps: string;

  @IsBoolean()
  @IsNotEmpty()
  is_pet_frendly: boolean;
}
