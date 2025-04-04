import { Injectable, Scope } from '@nestjs/common';
import * as winston from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, ...metadata }) => {
          let logMessage = `${timestamp as string} [${level.toUpperCase()}]`;

          if (metadata.route && metadata.method && metadata.status) {
            logMessage += ` route {${metadata.route as string}, ${metadata.method as string}} status ${metadata.status as string}`;
          }

          logMessage += `${message as string}`;

          if (
            Object.keys(metadata).filter(
              (key) => !['route', 'method', 'status'].includes(key),
            ).length > 0
          ) {
            logMessage += ` ${JSON.stringify(
              Object.fromEntries(
                Object.entries(metadata).filter(
                  (key) => !['route', 'method', 'status'].includes(key[0]),
                ),
              ),
            )}`;
          }
          return logMessage;
        }),
      ),
      transports: [new winston.transports.Console()],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  info(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}
