import { Prisma } from "@prisma/client";
import { Person } from "src/core/people/entities/person.entity";

export class CreateUserDto {
  email: string;
  password: string;
  active: boolean;
  people: Prisma.peopleUpdateManyWithoutUserNestedInput;
}
