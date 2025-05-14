import { getAccessToken } from "../utils/helpers";

const API_BASE_URL =
  import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3000/api";
class HttpClient {
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

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(fullUrl, {
        method,
        headers,
        ...options,
        signal: controller.signal,
        body: options?.body ? JSON.stringify(options.body) : undefined,
      });
      clearTimeout(timeout);

      // First check if we got an ngrok error page
      const textResponse = await response.clone().text();
      if (
        textResponse.includes("ngrok-free.app") ||
        textResponse.includes("ERR_NGROK")
      ) {
        throw new Error(
          `Ngrok interception: ${
            textResponse.match(/ERR_NGROK_\d+/)?.[0] || "Unknown ngrok error"
          }`
        );
      }

      // Then handle JSON responses
      const contentType = response.headers.get("Content-Type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error(`Unexpected Content-Type: ${contentType}`);
      }

      const data = await response.json();

      if (!response.ok) {
        console.error("[API Error]", {
          status: response.status,
          url: fullUrl,
          error: data,
        });
        throw data;
      }

      return data;
    } catch (error) {
      clearTimeout(timeout);
      console.error("[API Request Failed]", {
        method,
        url: fullUrl,
        error: error instanceof Error ? error.message : error,
      });
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
