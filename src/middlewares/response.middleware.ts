import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, timeout } from 'rxjs';

// Patterns
import { ResponsePattern } from '../utils/patterns/response';

@Injectable()
export class ResponseMiddleware implements NestInterceptor {
  private readonly logger: Logger = new Logger(ResponseMiddleware.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const timeoutEnv = 120000;
    const http = context.switchToHttp();
    const request = http.getRequest();
    const { url, params, body, method, headers } = request;

    this.logger.debug(`[${new Date()}] ${method} ${url}`);

    return next
      .handle()
      .pipe(
        map(
          (data) => ResponsePattern.run(method.toLowerCase(), data),
          timeout(timeoutEnv),
        ),
      );
  }
}