import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {Request} from '@shared/models/api/request.model';

export const AuthMetadata = createParamDecorator<unknown, ExecutionContext, string | null>(
  (data: unknown, ctx: ExecutionContext) => {
    const {headers} = ctx.switchToHttp().getRequest<Request>();

    return headers.authorization || null;
  },
);
