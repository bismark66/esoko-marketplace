// utils/api/token.ts
let accessToken = "";
let refreshToken = "";

export const getAccessToken = () => accessToken;
export const getRefreshToken = () => refreshToken;

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
};

export const clearTokens = () => {
  accessToken = "";
  refreshToken = "";
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
