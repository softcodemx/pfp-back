import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

// DTO's
import { UpdatePersonDto } from "src/core/people/dto/update-person.dto";

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

  people: UpdatePersonDto[];

  // people: Prisma.peopleUpdateManyWithoutUserNestedInput;
}
