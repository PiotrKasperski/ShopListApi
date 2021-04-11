import { Test, TestingModule } from '@nestjs/testing';
import { ShopListsService } from './shop-lists.service';

describe('ShopListsService', () => {
  let service: ShopListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopListsService],
    }).compile();

    service = module.get<ShopListsService>(ShopListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
