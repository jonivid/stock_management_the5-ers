import { IsString, IsUppercase, Matches } from "class-validator";

export class RemoveStockDto {
  @IsString()
  @IsUppercase()
  @Matches(/^[A-Z0-9\.\-]{1,10}$/)
  symbol: string;
}
