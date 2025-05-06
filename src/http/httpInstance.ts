// utils/http/httpInstance.ts
import { getAccessToken } from "../utils/helpers";
import { handleHttpResponse } from "./httpResponse";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

class HttpClient {
  private async request<T, B = unknown>(
    path: string,
    method: string,
    options?: RequestInit & { body?: B }
  ): Promise<T> {
    const token = getAccessToken();

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options?.headers || {}),
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const config: RequestInit = {
      method,
      headers,
      ...options,
      signal: controller.signal,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${path}`, config);
      clearTimeout(timeout);

      const contentType = response.headers.get("Content-Type") || "";

      // Clone response before handling
      const responseClone = response.clone();
      const responseData = contentType.includes("application/json")
        ? await handleHttpResponse<T>(response)
        : ((await responseClone.text()) as unknown as T);

      if (response.ok) {
        if (process.env.NODE_ENV === "development") {
          console.log(`[API Success] ${method} ${path}`, {
            status: response.status,
            data: responseData,
          });
        }
      } else {
        // Handle token refresh flow here if response.status === 401
        if (process.env.NODE_ENV === "development") {
          console.warn(`[API Error] ${method} ${path}`, {
            status: response.status,
            error: responseData,
          });
        }
      }

      return responseData;
    } catch (error) {
      clearTimeout(timeout);
      console.error(`[API Exception] ${method} ${path}`, error);
      throw error;
    }
  }

  get<T>(path: string, options?: RequestInit): Promise<T> {
    return this.request<T>(path, "GET", options);
  }

  post<T, B = unknown>(
    path: string,
    body?: B,
    options?: RequestInit
  ): Promise<T> {
    return this.request<T, B>(path, "POST", { ...options, body });
  }

  put<T, B = unknown>(
    path: string,
    body?: B,
    options?: RequestInit
  ): Promise<T> {
    return this.request<T, B>(path, "PUT", { ...options, body });
  }

  delete<T>(path: string, options?: RequestInit): Promise<T> {
    return this.request<T>(path, "DELETE", options);
  }
}

export const http = new HttpClient();
