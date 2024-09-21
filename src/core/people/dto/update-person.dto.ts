import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsNotEmpty, IsDate } from 'class-validator';

// DTO's
import { CreatePersonDto } from './create-person.dto';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
  @IsNumber()
  @IsNotEmpty()
  id_person: number;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsDate()
  deletedAt: Date;
}
