import { Module } from '@nestjs/common';

// Services
import { UsersService } from './users.service';
import { PrismaService } from 'src/db/prisma.service';

// Controllers
import { UsersController } from './users.controller';
import { UsersAbstract } from './users.abstract';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: UsersService,
      useValue: UsersAbstract,
    },
    PrismaService
  ],
  exports: [UsersService]
})
export class UsersModule {}
