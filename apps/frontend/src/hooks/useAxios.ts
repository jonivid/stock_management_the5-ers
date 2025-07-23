import { useState, useCallback } from "react";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { useAuth } from "../stores/useAuth";
import { axiosInstance } from "../services/axiosInstance";

export interface UseAxiosResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  request: (config: AxiosRequestConfig) => Promise<T | null>;
}

export function useAxios<T = any>(): UseAxiosResult<T> {
  const auth = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (config: AxiosRequestConfig) => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        let url = config.url || "";
        if (url.startsWith("/")) {
          url = url;
        } else {
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
          (axiosError.response?.data as any)?.message ||
            (axiosError as any).message ||
            "Unknown error"
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [auth.token]
  );

  return { data, error, loading, request };
}
