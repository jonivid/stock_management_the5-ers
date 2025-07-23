import { useState, useCallback } from "react";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { axiosInstance } from "../services/axiosInstance";

export interface UseAxiosResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  request: (config: AxiosRequestConfig) => Promise<T | null>;
}

export function useAxios<T = unknown>(): UseAxiosResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (config: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      let url = config.url || "";
      if (!url.startsWith("/")) {
        url = "/" + url;
      }
      const response = await axiosInstance({
        ...config,
        url,
      });
      setData(response.data);
      return response.data as T;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(
        (axiosError.response?.data as { message?: string } | undefined)
          ?.message ||
          axiosError.message ||
          "Unknown error"
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, request };
}
