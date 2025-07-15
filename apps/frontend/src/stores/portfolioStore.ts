import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { authStore } from "./useAuth";

// Use the same BASE_URL logic as useAxios
const RAW_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const BASE_URL = RAW_BASE_URL.endsWith("/")
  ? RAW_BASE_URL.slice(0, -1)
  : RAW_BASE_URL;

class PortfolioStore {
  portfolio: string[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchPortfolio() {
    this.loading = true;
    this.error = null;
    try {
      const res = await axios.get("/portfolio", {
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
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

  async addStock(symbol: string) {
    this.loading = true;
    this.error = null;
    try {
      await axios.post(
        "/portfolio",
        { symbol },
        {
          baseURL: BASE_URL,
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );
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
      await axios.delete(`/portfolio/${symbol}`, {
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
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
