import {ApiRepository} from '@shared/repositories/api.repository';

export class ApiService<T> {
  constructor(private readonly repository: ApiRepository<T>) {}

  protected splitArrayToChunks<T>(data: T[], size = 50): T[][] {
    const actualData = data.filter(value => !!value).filter((value, index, array) => array.indexOf(value) === index);

    const chunks: T[][] = [];

    for (let i = 0; i < actualData.length; i += size) {
      chunks.push(actualData.slice(i, i + size));
    }

    return chunks;
  }

  async create<S = unknown, R = unknown>(token: string | null, payload?: S, params?: R): Promise<T> {
    const {data} = await this.repository.create(token, payload, params);

    return data;
  }

  async save<S = unknown, R = unknown>(token: string | null, id: string, payload?: S, params?: R): Promise<T> {
    const {data} = await this.repository.save(token, id, payload, params);

    return data;
  }

  async saveMany<S = unknown, R = unknown>(token: string | null, payload?: S, params?: R): Promise<T[]> {
    const {data} = await this.repository.saveBatch(token, payload, params);

    return data;
  }

  async find<S = unknown>(token: string | null, params?: S): Promise<T[]> {
    const {data} = await this.repository.find(token, params);

    return data;
  }

  async findById<S = unknown>(token: string | null, id: string, params?: S): Promise<T | null> {
    const {data} = await this.repository.findById(token, id, params);

    return data;
  }

  async updateById<S = unknown, R = unknown>(
    token: string | null,
    id: string,
    payload?: S,
    params?: R,
  ): Promise<T | null> {
    const {data} = await this.repository.updateById(token, id, payload, params);

    return data;
  }

  async removeById<S = unknown>(token: string | null, id: string, params?: S): Promise<T | null> {
    const {data} = await this.repository.removeById(token, id, params);

    return data;
  }
}
