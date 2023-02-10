import {Test, TestingModule} from '@nestjs/testing';
import {HttpModule, HttpService} from '@nestjs/axios';
import {ApiRepository} from '@shared/repositories/api.repository';

describe('ApiRepository', () => {
  let module: TestingModule;
  let repository: ApiRepository<any>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [HttpModule.register({})],
    }).compile();
  });

  beforeEach(() => {
    repository = new ApiRepository<any>(module.get<HttpService>(HttpService));
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
