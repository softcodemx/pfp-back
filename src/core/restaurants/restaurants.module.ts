import { Module } from '@nestjs/common';

// Services
import { PrismaService } from 'src/db/prisma.service';
import { RestaurantsService } from './restaurants.service';

// Controllers
import { RestaurantsController } from './restaurants.controller';

@Module({
  controllers: [RestaurantsController],
  providers: [RestaurantsService, PrismaService],
})
export class RestaurantsModule {}
