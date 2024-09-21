import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

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
  findAll(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc'
  ) {
    const or = search
      ? {
          OR: [
            { email: { contains: search } },
            { active: { equals: search === "true" } },
          ],
        }
      : undefined;

    return this.usersService.findAll({
      skip: skip || undefined,
      take: take || undefined,
      where: { ...or },
      orderBy: {
        id_user: orderBy ? orderBy : 'desc',
      },
    });
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
