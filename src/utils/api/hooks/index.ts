// hooks/useLogin.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getProfileQueryFn,
  loginMutationFn,
  signUpMutationFn,
} from "@/utils/api/queryfns";
import type { LoginRequest } from "@/types";

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

export const useSignUp = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation({
    mutationFn: async (payload: any) => await signUpMutationFn(payload),
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
