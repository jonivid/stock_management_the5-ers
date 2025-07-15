import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PortfolioItem, PortfolioItemDocument } from "./portfolio.schema";

@Injectable()
export class PortfolioRepository {
  constructor(
    @InjectModel(PortfolioItem.name)
    private readonly portfolioModel: Model<PortfolioItemDocument>
  ) {}

  async findByUser(userId: string): Promise<PortfolioItem[]> {
    return this.portfolioModel.find({ userId }).exec();
  }

  async add(userId: string, symbol: string): Promise<PortfolioItem> {
    const item = new this.portfolioModel({ userId, symbol });
    return item.save();
  }

  async remove(userId: string, symbol: string): Promise<{ deleted: boolean }> {
    const res = await this.portfolioModel.deleteOne({ userId, symbol });
    return { deleted: res.deletedCount > 0 };
  }

  async exists(userId: string, symbol: string): Promise<boolean> {
    return !!(await this.portfolioModel.findOne({ userId, symbol }));
  }
}
