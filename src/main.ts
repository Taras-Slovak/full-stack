import { Container } from 'inversify';
import { App } from './app';
import { ExceptionFilter } from './error/exception.filter';
import { IExceptionFilter } from './error/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UsersController } from './users/users.controller';

const appContainer = new Container();

appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
appContainer.bind<UsersController>(TYPES.UsersController).to(UsersController);
appContainer.bind<App>(TYPES.Application).to(App);

const app = appContainer.get<App>(TYPES.Application);

app.init();

export { app, appContainer };