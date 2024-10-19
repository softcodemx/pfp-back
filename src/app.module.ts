import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Utils
import { UtilsModule } from './utils/utils.module';
import { EnvsService } from './utils/envs/envs.service';
import { EnvsEnum } from './utils/envs/envs.enum';

// Modules
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { MiddlewaresModule } from './middlewares/middlewares.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/',
      exclude: ['/api/(.*)'],
    }),
    UtilsModule,
    CoreModule,
    AuthModule,
    MiddlewaresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: string;
  static host: string;

  constructor(
    private readonly envsService: EnvsService
  ) {
    AppModule.port = this.envsService.get(EnvsEnum.PORT);
    AppModule.host = this.envsService.get(EnvsEnum.HOST);
  }
}
