import { makeAutoObservable, runInAction } from "mobx";
import { axiosInstance } from "../services/axiosInstance";
import type { StockDetail } from "./types";

class PortfolioStore {
  portfolio: string[] = [];
  loading = false;
  error: string | null = null;

  // Stock details cache and per-symbol loading/error
  stockDetails: Record<string, StockDetail> = {};
  stockDetailsLoading: Record<string, boolean> = {};
  stockDetailsError: Record<string, string | null> = {};

  constructor() {
    makeAutoObservable(this);
  }

  async fetchPortfolio() {
    this.loading = true;
    this.error = null;
    try {
      const res = await axiosInstance.get("/portfolio");
      runInAction(() => {
        this.portfolio = Array.isArray(res.data)
          ? res.data.map((item: any) => item.symbol)
          : [];
        this.loading = false;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error =
          err.response?.data?.message || err.message || "Unknown error";
        this.loading = false;
      });
    }
  }

  async fetchStockDetail(symbol: string) {
    // If already cached, do not refetch
    if (this.stockDetails[symbol]) return;
    this.stockDetailsLoading[symbol] = true;
    this.stockDetailsError[symbol] = null;
    try {
      const res = await axiosInstance.get("/fmp-client/quote", {
        params: { symbol },
      });
      const detail = Array.isArray(res.data) ? res.data[0] : null;
      runInAction(() => {
        if (detail) {
          this.stockDetails[symbol] = detail;
        } else {
          this.stockDetailsError[symbol] = "No data found";
        }
        this.stockDetailsLoading[symbol] = false;
      });
    } catch (err: any) {
      runInAction(() => {
        this.stockDetailsError[symbol] =
          err.response?.data?.message || err.message || "Unknown error";
        this.stockDetailsLoading[symbol] = false;
      });
    }
  }

  async addStock(symbol: string) {
    this.loading = true;
    this.error = null;
    try {
      await axiosInstance.post("/portfolio", { symbol });
      await this.fetchPortfolio();
    } catch (err: any) {
      runInAction(() => {
        this.error =
          err.response?.data?.message || err.message || "Unknown error";
        this.loading = false;
      });
    }
  }

  async removeStock(symbol: string) {
    this.loading = true;
    this.error = null;
    try {
      await axiosInstance.delete(`/portfolio/${symbol}`);
      await this.fetchPortfolio();
    } catch (err: any) {
      runInAction(() => {
        this.error =
          err.response?.data?.message || err.message || "Unknown error";
        this.loading = false;
      });
    }
  }
}

export const portfolioStore = new PortfolioStore();
export function usePortfolioStore() {
  return portfolioStore;
}
