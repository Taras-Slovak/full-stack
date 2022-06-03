import { ILogger } from './../logger/logger.interface';
import { BaseController } from './../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../error/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UsersService } from './users.service';

@injectable()
export class UsersController extends BaseController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UsersService) private usersService: UsersService,
  ) {
    super(loggerService);
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    next(new HTTPError(401, `error of authorization`));
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.usersService.createUser(body);
    if (!result) {
      return next(new HTTPError(422, 'this user already exists'));
    }
    this.ok(res, { email: result.email });
  }
}
