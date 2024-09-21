import { IsNotEmpty, IsString } from 'class-validator';

export class CredentialDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}