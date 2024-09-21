import { UpdateUserDto } from "src/core/users/dto/update-user.dto";

export class SessionDto {
  accessToken: string;
  user: UpdateUserDto;
}