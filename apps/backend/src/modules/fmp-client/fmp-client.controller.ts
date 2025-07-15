import { Controller, Get, Query, Logger } from "@nestjs/common";
import { FmpClientService } from "./fmp-client.service";
import { SearchResultDto } from "./search-result.dto";
import { StockDetailDto } from "./stock-detail.dto";

@Controller("fmp-client")
export class FmpClientController {
  private readonly logger = new Logger(FmpClientController.name);
  constructor(private readonly fmpClientService: FmpClientService) {}

  @Get("search-symbol")
  async searchSymbol(@Query("query") query: string) {
    this.logger.log(`Search symbol request: query='${query}'`);
    try {
      const result = await this.fmpClientService.searchSymbol(query);
      this.logger.log(
        `Search symbol success: query='${query}', results=${result.length}`
      );
      return result;
    } catch (error) {
      this.logger.error(`Search symbol failed: query='${query}'`, error.stack);
      throw error;
    }
  }

  @Get("search-name")
  async searchName(@Query("query") query: string) {
    this.logger.log(`Search name request: query='${query}'`);
    try {
      const result = await this.fmpClientService.searchName(query);
      this.logger.log(
        `Search name success: query='${query}', results=${result.length}`
      );
      return result;
    } catch (error) {
      this.logger.error(`Search name failed: query='${query}'`, error.stack);
      throw error;
    }
  }

  @Get("quote")
  async getQuote(@Query("symbol") symbol: string) {
    this.logger.log(`Get quote request: symbol='${symbol}'`);
    try {
      const result = await this.fmpClientService.getQuote(symbol);
      this.logger.log(
        `Get quote success: symbol='${symbol}', results=${result.length}`
      );
      return result;
    } catch (error) {
      this.logger.error(`Get quote failed: symbol='${symbol}'`, error.stack);
      throw error;
    }
  }
}
