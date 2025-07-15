import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PortfolioItemDocument = PortfolioItem & Document;

@Schema({ timestamps: true })
export class PortfolioItem {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, uppercase: true })
  symbol: string;

  @Prop({ default: Date.now })
  addedAt: Date;
}

export const PortfolioItemSchema = SchemaFactory.createForClass(PortfolioItem);
