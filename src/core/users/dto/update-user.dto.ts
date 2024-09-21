import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id_user: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
