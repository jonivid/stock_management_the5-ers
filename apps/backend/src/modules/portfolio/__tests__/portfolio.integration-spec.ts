import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioModule } from '../portfolio.module';
import { PortfolioService } from '../portfolio.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('PortfolioService (integration)', () => {
  let mongod: MongoMemoryServer;
  let service: PortfolioService;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        PortfolioModule,
      ],
    }).compile();

    service = module.get<PortfolioService>(PortfolioService);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  it('should add, list, and remove a stock for a user', async () => {
    await service.add('user1', { symbol: 'AAPL' });
    let list = await service.list('user1');
    expect(list.length).toBe(1);
    expect(list[0].symbol).toBe('AAPL');

    await service.remove('user1', { symbol: 'AAPL' });
    list = await service.list('user1');
    expect(list.length).toBe(0);
  });
});
