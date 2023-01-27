import {HttpService} from '@nestjs/axios';
import {Logger} from '@nestjs/common';

export class HttpRepository {
  private readonly logger = new Logger(HttpRepository.name);

  constructor(protected readonly httpService: HttpService) {
    httpService.axiosRef.interceptors.request.use(value => {
      const baseUrl = value.baseURL || '';
      const path = value.url || '';
      const method = value.method || '';

      this.logger.debug('REST API Request');
      this.logger.log(`${method.toUpperCase()}: ${baseUrl.toLowerCase()}${path.toLowerCase()}`);

      return value;
    });

    httpService.axiosRef.interceptors.response.use(value => {
      const baseUrl = value.config.baseURL || '';
      const path = value.config.url || '';
      const method = value.config.method || '';
      const status = value.status;

      this.logger.debug('REST API Response');
      this.logger.log(`${method.toUpperCase()}: ${baseUrl.toLowerCase()}${path.toLowerCase()} => ${status}`);

      return value;
    });
  }
}
