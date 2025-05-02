import {
  LoginRequest,
  LoginResponse,
  User,
  PasswordResetResponse,
  PasswordChangeType,
  RegisterUserResponse,
  EmailVerifyType,
  ApiError,
  CreateUser,
} from "@/types";
import { setAccessToken, setRefreshToken } from "@/utils/helpers";
import { http } from "./httpInstance";

export const authHandlers = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await http.post<LoginResponse>("/auth/login", payload);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError; // Re-throw for react-query to handle
    }
  },
  profile: async () => await http.get("/users/me"),
  logout: async () => await http.post("/logout"),
  refresh: async (): Promise<string> => {
    const response = await http.post<{
      accessToken: string;
      refreshToken: string;
    }>("/token/refresh");
    const { refreshToken, accessToken } = response;
    setRefreshToken(refreshToken);
    return accessToken;
  },
  register: async (payload: CreateUser): Promise<RegisterUserResponse> => {
    try {
      const response = await http.post<RegisterUserResponse>(
        "/auth/register",
        payload
      );
      return response;
    } catch (error) {
      // Convert the error to a standardized format
      const apiError = error as ApiError;
      console.error("Registration error:", apiError);
      throw apiError; // Re-throw for react-query to handle
    }
  },
  passwordReset: async (payload: {
    email: string;
  }): Promise<PasswordResetResponse> => {
    return await http.post("/password/password-reset", payload);
  },
  otpVerify: async (payload: { email: string; otp: string }) => {
    return await http.post("/password/verify-otp", payload);
  },
  passwordChange: async (payload: PasswordChangeType) => {
    return await http.post("/password/change", payload);
  },
  verifyEmail: async (payload: {
    email: string;
    otp: string;
    reference: string;
  }): Promise<EmailVerifyType> => {
    return await http.post("/verify-email", payload);
  },

  emailEmailVerificationRequest: async (payload: {
    email: string;
  }): Promise<EmailVerifyType> => {
    return await http.post("/verify-email", payload);
  },

  enable2FA: async (payload: {
    email: string;
    otp: string;
  }): Promise<EmailVerifyType> => {
    return await http.post("/enable-2fa", payload);
  },
  disable2FA: async (payload: {
    email: string;
    otp: string;
  }): Promise<EmailVerifyType> => {
    return await http.post("/disable-2fa", payload);
  },
  verify2FA: async (payload: { email: string }): Promise<EmailVerifyType> => {
    return await http.post("/2fa/verify", payload);
  },
  verifyEmailToken: async (payload: {
    email: string;
    token: string;
  }): Promise<EmailVerifyType> => {
    return await http.post("/verify-email-token", payload);
  },
  // Add more handlers as needed
};
