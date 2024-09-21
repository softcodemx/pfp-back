import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';

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
  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.peopleWhereUniqueInput;
    where?: Prisma.peopleWhereInput;
    orderBy?: Prisma.peopleOrderByWithRelationInput;
  }) {
    return this.peopleService.findAll(params);
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
