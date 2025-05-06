// utils/api/queryFns.ts
import { authHandlers } from "../../http/httpHandler";
import { LoginRequest } from "@/types";

// UseMutation: login
export const loginMutationFn = (payload: LoginRequest) => {
  return authHandlers.login(payload);
};

// UseQuery: profile
export const getProfileQueryFn = () => {
  return authHandlers.profile();
};

export const signUpMutationFn = async (payload: any) => {
  if (!payload.email || !payload.password) {
    throw new Error("Email and password are required");
  }
  return await authHandlers.register(payload);
};
