import { NestFactory } from '@nestjs/core';

// App
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger: Logger = new Logger('PetFrendly');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['debug', 'error', 'warn'],
  });

  logger.debug(`${AppModule.host}:${AppModule.port}`);
  await app.listen(AppModule.port, AppModule.host);
}
bootstrap();
