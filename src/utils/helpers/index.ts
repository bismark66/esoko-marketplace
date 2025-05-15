import { LoginResponse, User } from "@/types";

// utils/api/token.ts
let accessToken = "";
let refreshToken = "";
let user = {} as LoginResponse;

// export const getAccessToken = () => accessToken;
export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => refreshToken;
export const getUser = () => user;

export const setUser = (userData: LoginResponse) => {
  user = userData;
  localStorage.setItem("user", JSON.stringify(userData));
};

export const setAccessToken = (token: string) => {
  accessToken = token;
  localStorage.setItem("accessToken", token);
};

export const setRefreshToken = (token: string) => {
  refreshToken = token;
  localStorage.setItem("refreshToken", token);
};

export const loadTokensFromStorage = () => {
  accessToken = localStorage.getItem("accessToken") || "";
  refreshToken = localStorage.getItem("refreshToken") || "";
  user = localStorage.getItem("user")
    ? (JSON.parse(localStorage.getItem("user") as string) as LoginResponse)
    : ({} as LoginResponse);
};

export const clearTokens = () => {
  accessToken = "";
  refreshToken = "";
  user = {} as LoginResponse;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};
