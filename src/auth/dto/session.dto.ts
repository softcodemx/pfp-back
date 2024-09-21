import { IsNotEmpty, IsString, IsObject } from 'class-validator';

// DTO's
import { UpdateUserDto } from "src/core/users/dto/update-user.dto";

export class SessionDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsObject()
  @IsNotEmpty()
  user: UpdateUserDto;
}