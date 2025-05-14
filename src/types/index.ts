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
  status: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
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
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
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
  phone?: string;
};

export interface ProductQueryOptions {
  category?: string;
  isActive?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "name" | "price" | "createdAt" | "stockQuantity";
  sortDir?: "asc" | "desc";
}

export interface ProductDetails {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  stockQuantity: number;
  imagesUrls: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface ProductListResponse {
  data: ProductDetails[];
  pagination: Pagination;
}

export interface UserProfile {
  data: UserProfile;
  status: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  addresses: {
    id: number;
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }[];
  recentOrders: {
    id: number;
    orderNumber: string;
    orderDate: string;
    totalAmount: number;
    status: OrderStatus;
    itemCount: number;
  }[];
}

export type AddAddressType = {
  id: number;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

export enum OrderStatus {
  Pending = "PENDING",
  Processing = "PROCESSING",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
  Cancelled = "CANCELLED",
  "Request Cancelled" = "CANCELLATION_REQUESTED",
}

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  filters: {
    searchQuery: string;
    categoryFilter: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: "name" | "price" | "createdAt" | "stockQuantity";
    sortDir?: "asc" | "desc";
  };
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}