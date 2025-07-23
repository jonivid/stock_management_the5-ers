import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { axiosInstance } from "../services/axiosInstance";
import type { StockDetail } from "./types";

class PortfolioStore {
  portfolio: string[] = [];
  loading = false;
  error: string | null = null;

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
          ? res.data.map((item: { symbol: string }) => item.symbol)
          : [];
        this.loading = false;
      });
    } catch (err: unknown) {
      runInAction(() => {
        let errorMsg = "Unknown error";
        if (axios.isAxiosError(err)) {
          errorMsg = err.response?.data?.message || err.message || errorMsg;
        } else if (err instanceof Error) {
          errorMsg = err.message;
        }
        this.error = errorMsg;
        this.loading = false;
      });
    }
  }

  async fetchStockDetail(symbol: string) {
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
    } catch (err: unknown) {
      runInAction(() => {
        let errorMsg = "Unknown error";
        if (axios.isAxiosError(err)) {
          errorMsg = err.response?.data?.message || err.message || errorMsg;
        } else if (err instanceof Error) {
          errorMsg = err.message;
        }
        this.stockDetailsError[symbol] = errorMsg;
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
    } catch (err: unknown) {
      runInAction(() => {
        let errorMsg = "Unknown error";
        if (axios.isAxiosError(err)) {
          errorMsg = err.response?.data?.message || err.message || errorMsg;
        } else if (err instanceof Error) {
          errorMsg = err.message;
        }
        this.error = errorMsg;
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
    } catch (err: unknown) {
      runInAction(() => {
        let errorMsg = "Unknown error";
        if (axios.isAxiosError(err)) {
          errorMsg = err.response?.data?.message || err.message || errorMsg;
        } else if (err instanceof Error) {
          errorMsg = err.message;
        }
        this.error = errorMsg;
        this.loading = false;
      });
    }
  }
}

export const portfolioStore = new PortfolioStore();
export function usePortfolioStore() {
  return portfolioStore;
}
