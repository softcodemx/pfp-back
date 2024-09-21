import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsObject } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  people: Prisma.peopleUpdateManyWithoutUserNestedInput;
}
