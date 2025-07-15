// useAxios: Always uses VITE_BACKEND_URL as baseURL. Pass only relative paths (e.g., '/portfolio').
// Handles trailing slash issues to avoid double slashes in requests.
import { useState, useCallback } from "react";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { useAuth } from "../stores/useAuth";

// Remove trailing slash for consistency
const RAW_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const BASE_URL = RAW_BASE_URL.endsWith("/")
  ? RAW_BASE_URL.slice(0, -1)
  : RAW_BASE_URL;

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
        const headers: Record<string, any> = {
          ...(config.headers || {}),
        };
        if (auth.token) {
          headers["Authorization"] = `Bearer ${auth.token}`;
        }
        // Ensure url does not have double slashes
        let url = config.url || "";
        if (url.startsWith("/")) {
          url = url;
        } else {
          url = "/" + url;
        }
        const response = await axios({
          ...config,
          baseURL: BASE_URL,
          url,
          headers,
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
