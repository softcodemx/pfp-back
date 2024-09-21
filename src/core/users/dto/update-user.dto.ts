import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsNotEmpty, IsDate } from 'class-validator';

// DTO's
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @IsNotEmpty()
  id_user: number;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsDate()
  deletedAt: Date;
}
