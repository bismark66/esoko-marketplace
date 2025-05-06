import { useMutation, useQuery } from "@tanstack/react-query";
import {
  changePasswordMutationFn,
  getProfileQueryFn,
  loginMutationFn,
  updateProfileQueryFn,
} from "@/utils/api/queryfns";
import type {
  CreateUser,
  LoginRequest,
  PasswordResetOtpType,
  PasswordResetType,
  UpdateUserType,
} from "@/types";
import { authHandlers } from "@/http/httpHandler";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginRequest) => loginMutationFn(payload),
    onSuccess: (data) => {
      console.log("Logged in!", data);
      return data;
    },
    onError: (err: any) => {
      console.error("Login error:", err.message);
      return err;
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileQueryFn,
    staleTime: 1000 * 60 * 5, // cache for 5 mins
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (payload: UpdateUserType) =>
      await updateProfileQueryFn(payload),
    onSuccess: (data) => {
      console.log("Profile updated successfully", data);
      return data;
    },
    onError: (err: any) => {
      console.error("Error updating profile", err.message);
      return err;
    },
  });
};

export const useSignUp = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation({
    mutationFn: async (payload: CreateUser) =>
      await authHandlers.register(payload),
    // await signUpMutationFn(payload),
    onSuccess: (data) => {
      console.log("Signed up!", data.user);
      return data;
    },
    onError: (err: any) => {
      console.error("Sign up error:", err.message);
      return err;
    },
  });
};

export const useOtpVerify = () => {
  return useMutation({
    mutationFn: async (payload: {
      contact: string;
      otp: string;
      purpose: string;
    }) => await authHandlers.otpVerify(payload),
    onSuccess: (data) => {
      console.log("OTP verified!", data);
      return data;
    },
    onError: (err: any) => {
      console.error("OTP verification error:", err.message);
      return err;
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (payload: {
      currentPassword: string;
      newPassword: string;
    }) => await changePasswordMutationFn(payload),
    onSuccess: (data) => {
      console.log("password Changed", data);
      return data;
    },
    onError: (err: any) => {
      console.error("Password change Error", err.message);
      return err;
    },
  });
};

export const useRequestPassReset = () => {
  return useMutation({
    mutationFn: async (payload: { email: string }) =>
      await authHandlers.requestPasswordReset(payload),
    onSuccess: (data) => {
      console.log("Password reset request successful");
      return data;
    },
    onError: (err) => {
      console.error("Password reset request failed");
      return err;
    },
  });
};

export const usePassResetOtpVerify = () => {
  return useMutation({
    mutationFn: async (payload: PasswordResetOtpType) =>
      await authHandlers.resetPasswordOtp(payload),
    onSuccess: (data) => {
      console.log("Reset Password Otp Verify Successful");
      return data;
    },
    onError: (err) => {
      console.error("Error Verifying password reset otp");
      return err;
    },
  });
};

export const usePassReset = () => {
  return useMutation({
    mutationFn: async (payload: PasswordResetType) =>
      await authHandlers.passwordReset(payload),
    onSuccess: (data) => {
      console.log("password reset successful", data);
      return data;
    },
    onError: (err: any) => {
      console.error("Error resetting password", err);
      return err;
    },
  });
};
