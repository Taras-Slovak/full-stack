
import { Router } from "express";
import { LoggerService } from "../logger/logger.service";
import { IControllerRoute } from "./route.interface";

export abstract class BaseController {
  private readonly _router = Router();

  constructor(private logger: LoggerService) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    this.router.get('path', func);
  }
}