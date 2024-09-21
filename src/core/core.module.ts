import { Module } from '@nestjs/common';

// Modules
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { PeopleModule } from './people/people.module';

@Module({
  imports: [UsersModule, RestaurantsModule, PeopleModule],
})
export class CoreModule {}
