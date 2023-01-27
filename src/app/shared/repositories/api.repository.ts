import {AxiosResponse} from 'axios';
import {HttpRepository} from '@shared/repositories/http.repository';
import {HttpService} from '@nestjs/axios';

export class ApiRepository<T> extends HttpRepository {
  constructor(httpService: HttpService) {
    super(httpService);
  }

  protected static createHeaders(credential: string | null): Record<string, string> {
    return {
      authorization: credential || '',
    };
  }

  async create(credential: string | null, payload?: unknown, params?: unknown): Promise<AxiosResponse<T>> {
    return await this.httpService.axiosRef.post(``, payload, {
      headers: ApiRepository.createHeaders(credential),
      params: params,
    });
  }

  async save(credential: string | null, id: string, payload?: unknown, params?: unknown): Promise<AxiosResponse<T>> {
    return await this.httpService.axiosRef.put(`/${id}`, payload, {
      headers: ApiRepository.createHeaders(credential),
      params: params,
    });
  }

  async saveBatch(credential: string | null, payload?: unknown, params?: unknown): Promise<AxiosResponse<T[]>> {
    return await this.httpService.axiosRef.put(``, payload, {
      headers: ApiRepository.createHeaders(credential),
      params: params,
    });
  }

  async find(credential: string | null, params?: unknown): Promise<AxiosResponse<T[]>> {
    return await this.httpService.axiosRef.get(``, {
      headers: ApiRepository.createHeaders(credential),
      params: params,
    });
  }

  async findById(credential: string | null, id: string, params?: unknown): Promise<AxiosResponse<T | null>> {
    return await this.httpService.axiosRef.get(`/${id}`, {
      headers: ApiRepository.createHeaders(credential),
      params: params,
    });
  }

  async updateById(
    credential: string | null,
    id: string,
    payload?: unknown,
    params?: unknown,
  ): Promise<AxiosResponse<T | null>> {
    return await this.httpService.axiosRef.patch(`/${id}`, payload, {
      headers: ApiRepository.createHeaders(credential),
      params: params,
    });
  }

  async removeById(credential: string | null, id: string, params?: unknown): Promise<AxiosResponse<T | null>> {
    return await this.httpService.axiosRef.delete(`/${id}`, {
      headers: ApiRepository.createHeaders(credential),
      params: params,
    });
  }
}
