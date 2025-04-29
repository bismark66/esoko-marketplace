import { ApiError } from "@/types";

export async function handleHttpResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const error: ApiError = {
      error: {
        code: data?.error?.code || `HTTP_${response.status}`,
        message: data?.error?.message || response.statusText,
      },
      details: data?.details || undefined,
    };
    throw error; // Throw the structured error
  }

  return data as T;
}
