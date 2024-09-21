import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

// DTO's
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

// Services
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
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
            { name: { contains: search } },
            { surname: { contains: search } },
            { id_user: { equals: +search } },
          ],
        }
      : undefined;

    return this.peopleService.findAll({
      skip: skip || undefined,
      take: take || undefined,
      where: { ...or },
      orderBy: {
        id_person: orderBy ? orderBy : 'desc',
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.peopleService.findOne({id_person: id});
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update({
      where: { id_person: id },
      data: {
        ...updatePersonDto,
      }
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.peopleService.remove({
      id_person: id,
    });
  }
}
