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

export interface User {
  id: string;
  // name: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  invitationToken?: string;
}

export interface RegisterUserResponse {
  userId?: number;
  email?: string;
  userType?: string;
  status?: string;
  isEmailVerified?: boolean;
  statusCode?: number;
  success?: boolean;
  msg?: string;
  data?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isGoogle: boolean | null;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
  deviceId?: string;
  deviceInfo?: {
    appVersion?: string;
    platform?: string;
    model?: string;
  };
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    userType: "AGENT" | "ADMIN";
    status: "ACTIVE" | "INACTIVE";
    lastLogin: string;
  };
}

export type PasswordResetResponse = {
  message: string;
  status: string;
};

export type PasswordChangeType = {
  currentPassword: string;
  newPassword: string;
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