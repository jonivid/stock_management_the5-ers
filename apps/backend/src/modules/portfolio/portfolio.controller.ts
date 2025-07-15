import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { PortfolioService } from "./portfolio.service";
import { AddStockDto } from "./dto/add-stock.dto";
import { RemoveStockDto } from "./dto/remove-stock.dto";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { AuthRequest } from "./types/portfolio.types";

@UseGuards(JwtAuthGuard)
@Controller("portfolio")
export class PortfolioController {
  constructor(private readonly service: PortfolioService) {}

  @Get()
  async list(@Request() req: AuthRequest) {
    return this.service.list(req.user.userId);
  }

  @Post()
  async add(@Request() req: AuthRequest, @Body() dto: AddStockDto) {
    return this.service.add(req.user.userId, dto);
  }

  @Delete(":symbol")
  async remove(@Request() req: AuthRequest, @Param("symbol") symbol: string) {
    return this.service.remove(req.user.userId, { symbol });
  }
}
