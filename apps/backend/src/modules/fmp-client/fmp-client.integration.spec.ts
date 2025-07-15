import { Test, TestingModule } from "@nestjs/testing";
import { FmpClientService } from "./fmp-client.service";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";

describe("FmpClientService (integration)", () => {
  let service: FmpClientService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        HttpModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (config: ConfigService) => ({
            baseURL: "https://financialmodelingprep.com/stable",
            params: { apikey: config.get<string>("FMP_API_KEY") },
            timeout: 5000,
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [FmpClientService],
    }).compile();

    service = module.get<FmpClientService>(FmpClientService);
  });

  it("should fetch quote for AAPL", async () => {
    const data = await service.getQuote("AAPL");
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty("symbol", "AAPL");
    expect(data[0]).toHaveProperty("price");
  });

  it("should search symbol for AAPL", async () => {
    const data = await service.searchSymbol("AAPL");
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty("symbol");
    expect(data[0]).toHaveProperty("name");
  });

  it("should search name for Apple", async () => {
    const data = await service.searchName("Apple");
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty("symbol");
    expect(data[0]).toHaveProperty("name");
  });

  it("should handle no results gracefully for searchSymbol", async () => {
    const data = await service.searchSymbol("ZZZZZZZZZZZZZZZZZZZZ");
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });

  it("should handle no results gracefully for searchName", async () => {
    const data = await service.searchName("NoSuchCompanyName");
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });

  it("should respect the limit parameter in searchSymbol", async () => {
    const data = await service.searchSymbol("A", 2);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeLessThanOrEqual(2);
  });

  it("should respect the exchange parameter in searchName", async () => {
    const data = await service.searchName("Apple", 10, "NASDAQ");
    expect(Array.isArray(data)).toBe(true);
    data.forEach((item) => expect(item.exchange).toBe("NASDAQ"));
  });

});
