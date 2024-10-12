import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

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

  @IsString()
  @IsOptional() // The field 'photo' is optional
  photo?: string;
}
