import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { SearchResultDto } from "./search-result.dto";
import { StockDetailDto } from "./stock-detail.dto";

function isSupportedSymbol(symbol: string) {
  // Only allow uppercase letters, no dots or suffixes (US stocks)
  return /^[A-Z]+$/.test(symbol);
}

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
      // OPTIONAL: filter out non-supported symbols
      // return data.filter((item: SearchResultDto) =>
      //   isSupportedSymbol(item.symbol)
      // );
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
      // OPTIONAL: filter out non-supported symbols
      // return data.filter((item: SearchResultDto) =>
      //   isSupportedSymbol(item.symbol)
      // );
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
    if (!isSupportedSymbol(symbol)) {
      throw new BadRequestException(
        "This stock is not supported in the current plan."
      );
    }
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
