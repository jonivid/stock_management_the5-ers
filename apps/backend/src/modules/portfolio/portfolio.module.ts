import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PortfolioItem, PortfolioItemSchema } from "./portfolio.schema";
import { PortfolioRepository } from "./portfolio.repository";
import { PortfolioService } from "./portfolio.service";
import { PortfolioController } from "./portfolio.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PortfolioItem.name, schema: PortfolioItemSchema },
    ]),
  ],
  providers: [PortfolioRepository, PortfolioService],
  controllers: [PortfolioController],
  exports: [PortfolioService],
})
export class PortfolioModule {}
