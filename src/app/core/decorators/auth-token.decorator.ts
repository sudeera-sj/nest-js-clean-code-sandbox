import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "@shared/models/api/request.model";

/**
 * The id of the authorized user of an API call
 */
export const AuthToken = createParamDecorator<unknown, ExecutionContext, string | null>(
  (data: unknown, ctx: ExecutionContext) => {
    const {headers} = ctx.switchToHttp().getRequest<Request>();

    return headers.authorization || null;
  },
);
