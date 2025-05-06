// utils/api/queryFns.ts
import { authHandlers } from "../../http/httpHandler";
import { CreateUser, LoginRequest, UpdateUserType } from "@/types";

// UseMutation: login
export const loginMutationFn = (payload: LoginRequest) => {
  return authHandlers.login(payload);
};

// UseQuery: profile
export const getProfileQueryFn = () => {
  return authHandlers.profile();
};

export const updateProfileQueryFn = (payload: UpdateUserType) => {
  return authHandlers.updateProfile(payload);
};

export const signUpMutationFn = async (payload: CreateUser) => {
  if (!payload.email || !payload.password) {
    throw new Error("Email and password are required");
  }
  return await authHandlers.register(payload);
};

export const otpVerifyMutationFn = async (payload: {
  contact: string;
  otp: string;
  purpose: string;
}) => {
  if (!payload.contact || !payload.otp) {
    throw new Error("contact and OTP are required");
  }
  return await authHandlers.otpVerify({
    contact: payload.contact,
    otp: payload.otp,
    purpose: payload.purpose,
  });
};

export const changePasswordMutationFn = async (payload: {
  currentPassword: string;
  newPassword: string;
}) => {
  if (!payload.currentPassword && !payload.newPassword) {
    throw new Error("Invalid entries");
  }
  return await authHandlers.passwordChange({
    newPassword: payload.newPassword,
    currentPassword: payload.currentPassword,
  });
};