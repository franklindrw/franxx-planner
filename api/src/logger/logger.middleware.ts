import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length') || 0;
      const responseTime = Date.now() - startTime;

      const logContext = {
        method,
        originalUrl,
        statusCode,
        contentLength,
        responseTime,
        userAgent,
        params: req.params,
        query: req.query,
      };

      const logMessage = `${method} ${originalUrl} - ${statusCode} (${responseTime}ms)`;

      if (statusCode >= 400) {
        this.loggerService.error(logMessage, JSON.stringify(logContext));
      } else {
        this.loggerService.log(logMessage);
      }
    });

    next();
  }
}
