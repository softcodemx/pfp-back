import { Module } from '@nestjs/common';

// Services
import { PeopleService } from './people.service';
import { PrismaService } from 'src/db/prisma.service';

// Controllers
import { PeopleController } from './people.controller';

@Module({
  controllers: [PeopleController],
  providers: [PeopleService, PrismaService],
})
export class PeopleModule {}
