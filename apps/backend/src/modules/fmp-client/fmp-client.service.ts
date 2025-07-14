import { Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { SearchResultDto } from "./search-result.dto";
import { StockDetailDto } from "./stock-detail.dto";

@Injectable()
export class FmpClientService {
  private readonly logger = new Logger(FmpClientService.name);

  constructor(private readonly httpService: HttpService) {}

  async searchSymbol(
    query: string,
    limit?: number,
    exchange?: string
  ): Promise<SearchResultDto[]> {
    const params: any = { query };
    if (limit) params.limit = limit;
    if (exchange) params.exchange = exchange;
    const { data } = await firstValueFrom(
      this.httpService.get("/search-symbol", { params })
    );
    return data;
  }

  async searchName(
    query: string,
    limit?: number,
    exchange?: string
  ): Promise<SearchResultDto[]> {
    const params: any = { query };
    if (limit) params.limit = limit;
    if (exchange) params.exchange = exchange;
    const { data } = await firstValueFrom(
      this.httpService.get("/search-name", { params })
    );
    return data;
  }

  async getQuote(symbol: string): Promise<StockDetailDto[]> {
    const params = { symbol };
    const { data } = await firstValueFrom(
      this.httpService.get("/quote", { params })
    );
    return data;
  }
}
