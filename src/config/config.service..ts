import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.logger.error('[ConfigService] The file could not be read or is missing');
    } else {
      this.logger.log('[ConfigService] Configuration of .env loaded');
      this.config = result.parsed as DotenvParseOutput;
    }
  }
  get<T extends number | string>(key: string): T {
    return this.config[key] as T;
  }
}