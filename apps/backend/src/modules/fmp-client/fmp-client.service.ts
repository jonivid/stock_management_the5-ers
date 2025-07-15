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
    const baseURL = this.httpService.axiosRef.defaults.baseURL;
    const apiKey = this.httpService.axiosRef.defaults.params?.apikey;
    const url = `${baseURL}/search-symbol?query=${encodeURIComponent(query)}${
      limit ? `&limit=${limit}` : ""
    }${exchange ? `&exchange=${exchange}` : ""}&apikey=${apiKey}`;
    this.logger.log(`[FMP] Requesting: ${url}`);
    try {
      const { data } = await firstValueFrom(
        this.httpService.get("/search-symbol", { params })
      );
      return data;
    } catch (error) {
      this.logger.error(
        `[FMP] Error in /search-symbol | params: ${JSON.stringify(params)}`,
        error.stack
      );
      throw error;
    }
  }

  async searchName(
    query: string,
    limit?: number,
    exchange?: string
  ): Promise<SearchResultDto[]> {
    const params: any = { query };
    if (limit) params.limit = limit;
    if (exchange) params.exchange = exchange;
    const baseURL = this.httpService.axiosRef.defaults.baseURL;
    const apiKey = this.httpService.axiosRef.defaults.params?.apikey;
    const url = `${baseURL}/search-name?query=${encodeURIComponent(query)}${
      limit ? `&limit=${limit}` : ""
    }${exchange ? `&exchange=${exchange}` : ""}&apikey=${apiKey}`;
    this.logger.log(`[FMP] Requesting: ${url}`);
    try {
      const { data } = await firstValueFrom(
        this.httpService.get("/search-name", { params })
      );
      return data;
    } catch (error) {
      this.logger.error(
        `[FMP] Error in /search-name | params: ${JSON.stringify(params)}`,
        error.stack
      );
      throw error;
    }
  }

  async getQuote(symbol: string): Promise<StockDetailDto[]> {
    const params = { symbol };
    const baseURL = this.httpService.axiosRef.defaults.baseURL;
    const apiKey = this.httpService.axiosRef.defaults.params?.apikey;
    const url = `${baseURL}/quote?symbol=${encodeURIComponent(
      symbol
    )}&apikey=${apiKey}`;
    this.logger.log(`[FMP] Requesting: ${url}`);
    try {
      const { data } = await firstValueFrom(
        this.httpService.get("/quote", { params })
      );
      return data;
    } catch (error) {
      this.logger.error(
        `[FMP] Error in /quote | params: ${JSON.stringify(params)}`,
        error.stack
      );
      throw error;
    }
  }
}
