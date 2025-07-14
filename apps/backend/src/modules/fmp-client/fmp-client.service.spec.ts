import { Test, TestingModule } from "@nestjs/testing";
import { FmpClientService } from "./fmp-client.service";
import { HttpService } from "@nestjs/axios";
import { of } from "rxjs";

describe("FmpClientService", () => {
  let service: FmpClientService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FmpClientService,
        {
          provide: HttpService,
          useValue: { get: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<FmpClientService>(FmpClientService);
    httpService = module.get<HttpService>(HttpService);
  });

  it("should call /search-symbol with correct params", async () => {
    const mockData = [{ symbol: "AAPL", name: "Apple Inc." }];
    (httpService.get as jest.Mock).mockReturnValueOnce(of({ data: mockData }));

    const result = await service.searchSymbol("AAPL");
    expect(httpService.get).toHaveBeenCalledWith("/search-symbol", {
      params: { query: "AAPL" },
    });
    expect(result).toEqual(mockData);
  });

  it("should call /search-name with correct params", async () => {
    const mockData = [{ symbol: "AAPL", name: "Apple Inc." }];
    (httpService.get as jest.Mock).mockReturnValueOnce(of({ data: mockData }));

    const result = await service.searchName("Apple");
    expect(httpService.get).toHaveBeenCalledWith("/search-name", {
      params: { query: "Apple" },
    });
    expect(result).toEqual(mockData);
  });

  it("should call /quote with correct params", async () => {
    const mockData = [{ symbol: "AAPL", name: "Apple Inc." }];
    (httpService.get as jest.Mock).mockReturnValueOnce(of({ data: mockData }));

    const result = await service.getQuote("AAPL");
    expect(httpService.get).toHaveBeenCalledWith("/quote", {
      params: { symbol: "AAPL" },
    });
    expect(result).toEqual(mockData);
  });
});
