import {CanActivate, ExecutionContext, Injectable, Logger} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Request} from '@shared/models/api/request.model';
import {PUBLIC, SKIP_AUTHENTICATION} from '@constants/decorator-key.constants';

/**
 * Used globally to authenticate and authorize all endpoints that aren't marked with @Public
 */
@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    this.logger.log(`Request Path: ${request.path}`);
    this.logger.log(`Request Origin: ${request.headers.origin}`);

    const token = request.headers.authorization;

    if (this.reflector.get<boolean>(SKIP_AUTHENTICATION, context.getHandler())) {
      this.logger.log(`Skipping authentication for: ${request.path}`);

      return true;
    }

    if (token) {
      return true;
    } else if (this.reflector.get<boolean>(PUBLIC, context.getHandler())) {
      return false;
    }

    return false;
  }
}
