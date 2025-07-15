import {
  Injectable,
  BadRequestException,
  ConflictException,
  Logger,
} from "@nestjs/common";
import { PortfolioRepository } from "./portfolio.repository";
import { AddStockDto } from "./dto/add-stock.dto";
import { RemoveStockDto } from "./dto/remove-stock.dto";

@Injectable()
export class PortfolioService {
  private readonly logger = new Logger(PortfolioService.name);
  constructor(private readonly repo: PortfolioRepository) {}

  async list(userId: string) {
    this.logger.log(`Finding portfolio for user: ${userId}`);
    return this.repo.findByUser(userId);
  }

  async add(userId: string, dto: AddStockDto) {
    const symbol = dto.symbol;
    this.logger.log(
      `Adding stock '${symbol}' to portfolio for user: ${userId}`
    );
    if (await this.repo.exists(userId, symbol)) {
      throw new ConflictException("Stock already in portfolio");
    }
    return this.repo.add(userId, symbol);
  }

  async remove(userId: string, dto: RemoveStockDto) {
    const symbol = dto.symbol;
    this.logger.log(
      `Removing stock '${symbol}' from portfolio for user: ${userId}`
    );
    const result = await this.repo.remove(userId, symbol);
    if (!result.deleted) {
      throw new BadRequestException("Stock not found in portfolio");
    }
    return result;
  }
}
