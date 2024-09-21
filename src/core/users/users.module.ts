import { Module } from '@nestjs/common';

// Services
import { UsersService } from './users.service';
import { PrismaService } from 'src/db/prisma.service';

// Controllers
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService]
})
export class UsersModule {}
