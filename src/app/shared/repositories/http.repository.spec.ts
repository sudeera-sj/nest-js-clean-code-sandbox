import {Test, TestingModule} from '@nestjs/testing';
import {HttpModule, HttpService} from '@nestjs/axios';
import {HttpRepository} from '@shared/repositories/http.repository';
import {ApiRepository} from '@shared/repositories/api.repository';

describe('HttpRepository', () => {
  let module: TestingModule;
  let repository: HttpRepository;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [HttpModule.register({})],
    }).compile();
  });

  beforeEach(() => {
    repository = new HttpRepository(module.get<HttpService>(HttpService));
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
