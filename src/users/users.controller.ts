import { LoggerService } from './../logger/logger.service';
import { BaseController } from './../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../error/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
import { UsersLoginDto } from './dto/users-login.dto';
import { UsersRegisterDto } from './dto/users-register.dto';

@injectable()
export class UsersController extends BaseController {
  constructor(@inject(TYPES.ILogger) loggerService: LoggerService) {
    super(loggerService);
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  login(req: Request<{}, {}, UsersLoginDto>, res: Response, next: NextFunction): void {
    next(new HTTPError(401, `error of authorization`));
  }

  register(req: Request<{}, {}, UsersRegisterDto>, res: Response, next: NextFunction): void {
    this.ok(res, 'login');
  }
}
