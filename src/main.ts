import { App } from './app';
import { ExceptionFilter } from './error/exception.filter';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';

async function bootstrap() {
  const logger = new LoggerService();
  const app = new App(
    logger,
    new UsersController(logger),
    new ExceptionFilter(logger)
  );
  await app.init();
}

bootstrap();