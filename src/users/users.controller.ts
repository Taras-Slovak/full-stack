import { LoggerService } from './../logger/logger.service';
import { BaseController } from './../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../error/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class UsersController extends BaseController {
  constructor(@inject(TYPES.ILogger) loggerService: LoggerService) {
    super(loggerService);
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction): void {
    console.log('TESTING');
    next(new HTTPError(401, `error of authorization`));
  }

  register(req: Request, res: Response, next: NextFunction): void {
    this.ok(res, 'login');
  }
}
