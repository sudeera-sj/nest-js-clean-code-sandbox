import {Test, TestingModule} from '@nestjs/testing';
import {HttpModule, HttpService} from '@nestjs/axios';
import {ApiService} from '@shared/services/api.service';
import {ApiRepository} from '@shared/repositories/api.repository';

describe('ApiService', () => {
  let module: TestingModule;
  let service: ApiService<any>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [HttpModule.register({})],
      providers: [ApiService],
    }).compile();
  });

  beforeEach(() => {
    const repository = new ApiRepository<any>(module.get<HttpService>(HttpService));

    service = new ApiService<Document>(repository);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
