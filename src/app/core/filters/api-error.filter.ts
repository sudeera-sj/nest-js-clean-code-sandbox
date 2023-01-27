import {ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger} from '@nestjs/common';
import axios, {AxiosError} from 'axios';
import {Request} from '@shared/models/api/request.model';
import {Response} from '@shared/models/api/response.model';
import {ResponsePayloadStatus} from '@shared/models/api/response-payload-status.model';

@Catch()
export class ApiErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiErrorFilter.name);

  catch(error: Error, host: ArgumentsHost): void {
    const httpArgumentsHost = host.switchToHttp();

    const request = httpArgumentsHost.getRequest<Request>();
    const response = httpArgumentsHost.getResponse<Response>();

    const method = request.method.toUpperCase();
    const path = request.path.toLowerCase();
    const time = request.start ? Date.now() - request.start : 0;

    let status = error instanceof HttpException && error.getStatus ? error.getStatus() : 500;

    let exceptionResponse: any;
    if (error instanceof HttpException && error.getResponse) {
      exceptionResponse = error.getResponse();
    } else if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        status = axiosError.response.status;
        exceptionResponse = axiosError.response.data;
      } else {
        exceptionResponse = null;
      }
    } else {
      exceptionResponse = error;
    }

    let data;
    if (typeof exceptionResponse === 'string') {
      data = exceptionResponse;
    } else if (exceptionResponse && exceptionResponse.message) {
      data = exceptionResponse.message;
    } else if (typeof exceptionResponse !== 'undefined' && typeof exceptionResponse !== 'function') {
      data = exceptionResponse;
    } else {
      data = null;
    }

    this.logger.log(`${method} ${path} => ${status}. Took ${time} ms`);
    this.logger.error(error);

    response.status(status).json({
      status: ResponsePayloadStatus.FAIL,
      message: error.message,
      data: data || null,
    });
  }
}
