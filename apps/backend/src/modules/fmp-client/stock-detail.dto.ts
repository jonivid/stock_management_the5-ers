export interface StockDetailDto {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  volume: number;
  marketCap: number;
  avgPrice50: number;
  avgPrice200: number;
  open: number;
  previousClose: number;
}
