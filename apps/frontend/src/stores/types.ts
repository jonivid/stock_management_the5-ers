export interface StockDetail {
  name: string;
  price: number;
  changePercentage: number;
  dayLow: number;
  dayHigh: number;
  yearLow: number;
  yearHigh: number;
  volume: number;
  marketCap: number;
  avgPrice50: number;
  avgPrice200: number;
  open: number;
  previousClose: number;
}
