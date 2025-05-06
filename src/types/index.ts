export interface Product {
  id: string;
  name: string;
  category: 'grains' | 'livestock' | 'produce';
  price: number;
  unit: string;
  location: string;
  grade: string;
  quantity: number;
  imageUrl: string;
  description: string;
  certifications: string[];
  harvestDate: string;
  seller: {
    id: string;
    name: string;
    rating: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

// export interface User {
//   id: string;
//   // name: string;
//   firstName: string;
//   lastName: string;
//   password: string;
//   email: string;
//   invitationToken?: string;
// }

export interface RegisterUserResponse {
  userId?: number;
  email?: string;
  firstName: string;
  lastName: string;
  userType?: string;
  status?: string;
  isEmailVerified?: boolean;
   message: string;
    otpReference: string;
  statusCode?: number;
  success?: boolean;
}

export interface LoginRequestType {
  email: string;
  password: string;
  // deviceId?: string;
  // deviceInfo?: {
  //   appVersion?: string;
  //   platform?: string;
  //   model?: string;
  // };
}

export interface User {
  phone: string;
  // id: number;
  email: string;
  firstName: string;
  lastName: string;
  userType: "AGENT" | "ADMIN";
  status: "ACTIVE" | "INACTIVE";
  lastLogin: string;
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  passwordChangedAt: string;
  addresses: boolean;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: User;
}

export type PasswordResetResponse = {
  message: string;
};

export type PasswordChangeType = {
  currentPassword: string;
  newPassword: string;
};

export type RequestPasswordResetResponse = {
  message: string;
  expiresAt: string;
};
export type ResetPassOtpVerifyResponse = {
  message: string;
  resetToken: string;
};

export type PasswordResetType = {
  newPassword: string;
  resetToken: string;
};

export type PasswordResetOtpType = {
  email: string;
  otp: string;
};

export type EmailVerifyType = {
  message: string;
  isEmailVerified: boolean;
};

export type ApiErrorDetail = {
  [key: string]: any; // Flexible structure for additional details
};

export type ApiError = {
  error: {
    code: string;
    message: string;
  };
  details?: ApiErrorDetail;
};

export type UpdateUserType = {
  firstName: string;
  lastName: string;
};