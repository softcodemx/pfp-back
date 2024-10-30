import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

// DTO's
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Services
import { UsersAbstract } from './users.abstract';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersAbstract: UsersAbstract
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersAbstract.create(createUserDto);
  }

  @Get()
  findAllWeb(
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

    return this.usersAbstract.findAll({
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
    return this.usersAbstract.findOne({id_user: id});
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersAbstract.update({
      where: { id_user: id },
      data: {
        ...updateUserDto,
      }
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersAbstract.remove({
      id_user: id,
    });
  }
}
