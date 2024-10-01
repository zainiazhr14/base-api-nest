import { Test, TestingModule } from '@nestjs/testing';
import { Mongoose } from './mongoose';

describe('Mongoose', () => {
  let provider: Mongoose;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Mongoose],
    }).compile();

    provider = module.get<Mongoose>(Mongoose);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
