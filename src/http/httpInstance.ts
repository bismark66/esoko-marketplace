import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  setUser,
} from "../utils/helpers";
import { authHandlers } from "./httpHandler";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
class HttpClient {
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];
  private async request<T, B = unknown>(
    path: string,
    method: string,
    options?: RequestInit & { body?: B }
  ): Promise<T> {
    const token = getAccessToken();
    const fullUrl = `${API_BASE_URL}/v1${path}`;

    console.debug("[API Request]", { method, url: fullUrl }); // Debug log

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options?.headers || {}),
    };

    try {
      return await this.makeRequest<T, B>(fullUrl, method, headers, options);
    } catch (error) {
      if (this.isTokenExpiredError(error) && !this.isRefreshing) {
        return this.handleTokenRefresh<T, B>(fullUrl, method, headers, options);
      }
      throw error;
    }
  }

  private async makeRequest<T, B>(
    url: string,
    method: string,
    headers: HeadersInit,
    options?: RequestInit & { body?: B }
  ): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(url, {
        method,
        headers,
        ...options,
        signal: controller.signal,
        body: options?.body ? JSON.stringify(options.body) : undefined,
      });
      clearTimeout(timeout);

      // Handle ngrok errors
      const textResponse = await response.clone().text();
      if (
        textResponse.includes("ngrok-free.app") ||
        textResponse.includes("ERR_NGROK")
      ) {
        throw new Error(
          `Ngrok error: ${
            textResponse.match(/ERR_NGROK_\d+/)?.[0] || "Unknown"
          }`
        );
      }

      if (!response.headers.get("Content-Type")?.includes("application/json")) {
        throw new Error("Unexpected content type");
      }

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    } catch (error) {
      clearTimeout(timeout);
      throw error;
    }
  }
  private isTokenExpiredError(error: any): boolean {
    return (
      error?.status === 401 ||
      error?.code === "token_expired" ||
      (error instanceof Error && error.message.includes("Unauthorized"))
    );
  }

  private async handleTokenRefresh<T, B>(
    originalUrl: string,
    originalMethod: string,
    originalHeaders: HeadersInit,
    originalOptions?: RequestInit & { body?: B }
  ): Promise<T> {
    this.isRefreshing = true;
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      // Refresh the token
      const response = await authHandlers.refresh({
        refreshToken,
      });

      if (!response.accessToken) {
        throw new Error("Failed to refresh token");
      }
      // Update the user data in local storage
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = {
        ...user,
        accessToken: response.accessToken,
        expiresAt: response.expiresAt,
      };
      setAccessToken(response.accessToken);
      setUser(updatedUser);
      // Update the refresh token in local storage
      if (response.refreshToken) {
        setRefreshToken(response.refreshToken);
      }

      // Update the original request's authorization header
      originalHeaders = {
        ...originalHeaders,
        Authorization: `Bearer ${response.accessToken}`,
      };

      // Retry the original request
      return this.makeRequest<T, B>(
        originalUrl,
        originalMethod,
        originalHeaders,
        originalOptions
      );
    } catch (error) {
      throw new Error("Session expired. Please login again.");
    } finally {
      this.isRefreshing = false;
    }
  }

  get<T>(path: string, options?: RequestInit): Promise<T> {
    return this.request<T>(path, "GET", options);
  }

  post<T, B = null>(path: string, body?: B, options?: RequestInit): Promise<T> {
    return this.request<T, B>(path, "POST", { ...options, body });
  }

  put<T, B = null>(path: string, body?: B, options?: RequestInit): Promise<T> {
    return this.request<T, B>(path, "PUT", { ...options, body });
  }

  delete<T>(path: string, options?: RequestInit): Promise<T> {
    return this.request<T>(path, "DELETE", options);
  }
}

export const http = new HttpClient();
