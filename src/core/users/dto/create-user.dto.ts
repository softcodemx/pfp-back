import { Prisma } from "@prisma/client";

export class CreateUserDto {
  email: string;
  password: string;
  active: boolean;
  people: Prisma.peopleUpdateManyWithoutUserNestedInput;
}
