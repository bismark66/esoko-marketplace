// utils/api/queryFns.ts
import {
  authHandlers,
  ordersHandlers,
  productsHandlers,
  userHandlers,
} from "../../http/httpHandler";
import {
  CreateUser,
  LoginRequest,
  ProductDetails,
  ProductListResponse,
  ProductQueryOptions,
  UpdateUserType,
  UserProfile,
} from "@/types";

// UseMutation: login
export const loginMutationFn = (payload: LoginRequest) => {
  return authHandlers.login(payload);
};

// UseQuery: profile
export const getProfileQueryFn = async (): Promise<UserProfile> => {
  const profile = await authHandlers.profile();
  return profile;
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

export const getAllProductsQueryFn = async (
  options: ProductQueryOptions
): Promise<ProductListResponse> => {
  const response = await productsHandlers.getAllProducts(options); // Return array of ProductListResponse
  return response;
};
export const getAddressesQueryFn = async () => {
  return await userHandlers.customerAddress();
};

export const addCustomerAddressMutationFn = async (payload: any) => {
  return await userHandlers.addCustomerAddress(payload);
};

export const getProductQueryFn = async (
  id: string
): Promise<ProductDetails> => {
  return await productsHandlers.getProductById(id);
};

export const getOrdersQueryFn = async () => {
  return await ordersHandlers.getOrders();
};

export const getOrderByIdQueryFn = async (id: string) => {
  return await ordersHandlers.getOrderById(id);
};
