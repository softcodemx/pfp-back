import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

// App
import { AppModule } from './app.module';

const logger: Logger = new Logger('PetFrendly');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['debug', 'error', 'warn'],
  });

  app.useGlobalPipes(new ValidationPipe());

  logger.debug(`${AppModule.host}:${AppModule.port}`);
  await app.listen(AppModule.port, AppModule.host);
}
bootstrap();
