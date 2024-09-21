import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

// Middlewares
import { CatchsMiddleware } from './middlewares/catchs.middleware';
import { ResponseMiddleware } from './middlewares/response.middleware';

// App
import { AppModule } from './app.module';

const logger: Logger = new Logger('PetFrendly');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['debug', 'error', 'warn'],
  });

  // Middlewares
  app.useGlobalInterceptors(new ResponseMiddleware());
  app.useGlobalFilters(new CatchsMiddleware());

  // Validations
  app.useGlobalPipes(new ValidationPipe());

  logger.debug(`${AppModule.host}:${AppModule.port}`);
  await app.listen(AppModule.port, AppModule.host);
}
bootstrap();
