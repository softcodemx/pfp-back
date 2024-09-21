import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-person.dto';
import { UpdateUserDto } from 'src/core/users/dto/update-user.dto';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
