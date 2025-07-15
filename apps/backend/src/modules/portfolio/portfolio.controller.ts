import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Req,
  Logger,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { PortfolioService } from "./portfolio.service";
import { AddStockDto } from "./dto/add-stock.dto";
import { RemoveStockDto } from "./dto/remove-stock.dto";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { AuthRequest } from "./types/portfolio.types";

@UseGuards(JwtAuthGuard)
@Controller("portfolio")
export class PortfolioController {
  private readonly logger = new Logger(PortfolioController.name);
  constructor(private readonly service: PortfolioService) {}

  @Get()
  async list(@Request() req: AuthRequest) {
    this.logger.log(`GET portfolio for user: ${req.user?.userId}`);
    try {
      const result = await this.service.list(req.user.userId);
      this.logger.log(`Portfolio fetched for user: ${req.user?.userId}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Failed to fetch portfolio for user: ${req.user?.userId}`,
        error.stack
      );
      throw error;
    }
  }

  @Post()
  async add(@Request() req: AuthRequest, @Body() dto: AddStockDto) {
    this.logger.log(
      `POST add stock '${dto.symbol}' for user: ${req.user?.userId}`
    );
    try {
      const result = await this.service.add(req.user.userId, dto);
      this.logger.log(
        `Stock '${dto.symbol}' added for user: ${req.user?.userId}`
      );
      return result;
    } catch (error) {
      this.logger.error(
        `Failed to add stock '${dto.symbol}' for user: ${req.user?.userId}`,
        error.stack
      );
      throw error;
    }
  }

  @Delete(":symbol")
  async remove(@Request() req: AuthRequest, @Param("symbol") symbol: string) {
    this.logger.log(
      `DELETE remove stock '${symbol}' for user: ${req.user?.userId}`
    );
    try {
      const result = await this.service.remove(req.user.userId, { symbol });
      this.logger.log(
        `Stock '${symbol}' removed for user: ${req.user?.userId}`
      );
      return result;
    } catch (error) {
      this.logger.error(
        `Failed to remove stock '${symbol}' for user: ${req.user?.userId}`,
        error.stack
      );
      throw error;
    }
  }
}
