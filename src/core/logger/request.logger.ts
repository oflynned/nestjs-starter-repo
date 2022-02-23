import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, path } = request;
    const correlationId = request.headers['x-correlation-id'];
    const startTime = Date.now();

    response.on('close', () => {
      const { statusCode } = response;
      const latency = Date.now() - startTime;

      this.logger.log(
        `${correlationId}: ${method} ${path} ${statusCode} ${latency}ms`,
      );
    });

    next();
  }
}
