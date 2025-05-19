import { LoginResponse } from "@/types";

export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

export const getUser = (): LoginResponse | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setUser = (userData: LoginResponse): void => {
  localStorage.setItem("user", JSON.stringify(userData));
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem("accessToken", token);
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem("refreshToken", token);
};

export const clearTokens = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  localStorage.removeItem("cart");
};

// Initialize auth state on app load
export const initializeAuth = () => {
  const token = getAccessToken();
  const user = getUser();
  return { token, user };
};
