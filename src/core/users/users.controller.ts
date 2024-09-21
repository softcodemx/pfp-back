import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// DTO's
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Services
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.usersWhereUniqueInput;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput;
  }) {
    return this.usersService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne({id_user: id});
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({
      where: { id_user: id },
      data: {
        ...updateUserDto,
      }
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove({
      id_user: id,
    });
  }
}
