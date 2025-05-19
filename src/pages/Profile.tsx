import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  User,
  LogOut,
  ShoppingCart,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  HelpCircle,
  ChevronRight,
  Edit,
  Check,
  X,
  Lock,
} from "lucide-react";
import {
  useChangePassword,
  useUpdateProfile,
  useProfile,
} from "@/utils/api/hooks";
import { getProfileQueryFn } from "@/utils/api/queryfns";
import App from "@/App";
import AppLoader from "@/components/AppLoader";

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  userType: string;
  passwordChangedAt?: string;
  profileImage?: string;
  addresses?: Address[];
}

interface AuthUser {
  user: UserData;
  token: string;
}

interface EditData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface PasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordErrors {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface RecentOrder {
  id: string;
  date: string;
  status: "Delivered" | "Processing" | "Shipped" | "Cancelled";
  total: number;
}

export default function Profile() {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth() as {
    user: AuthUser | null;
    logout: () => void;
  };
  const user = authUser?.user;

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<EditData>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState<PasswordData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // const { profile, setProfile } = useState<any>({});

  const { mutate: changePassword, isLoading: isChanging } = useChangePassword();
  const { mutate: updateProfile, isLoading: isUpdating } = useUpdateProfile();
  const { data: profile, isLoading: isProfileLoading, error } = useProfile();

  // Mock recent order data - replace with real API call
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([
    { id: "ORD-5782", date: "2025-04-15", status: "Delivered", total: 832.5 },
    { id: "ORD-5643", date: "2025-04-02", status: "Processing", total: 156.25 },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(editData, {
        onSuccess: () => {
          setIsEditing(false);
          showNotification("Profile updated successfully", "success");
        },
        onError: (error) => {
          showNotification(
            error.message || "Failed to update profile",
            "error"
          );
        },
      });
    } catch (error) {
      showNotification("Failed to update profile", "error");
      console.error("Failed to update profile:", error);
    }
  };

  const handleCancel = () => {
    setEditData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
    setIsEditing(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPasswordErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validatePasswordChange = (): boolean => {
    let valid = true;
    const newErrors: PasswordErrors = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!passwordData.oldPassword) {
      newErrors.oldPassword = "Current password is required";
      valid = false;
    }

    if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
      valid = false;
    } else if (!/[A-Z]/.test(passwordData.newPassword)) {
      newErrors.newPassword = "Must contain at least one uppercase letter";
      valid = false;
    } else if (!/[0-9]/.test(passwordData.newPassword)) {
      newErrors.newPassword = "Must contain at least one number";
      valid = false;
    } else if (!/[^A-Za-z0-9]/.test(passwordData.newPassword)) {
      newErrors.newPassword = "Must contain at least one special character";
      valid = false;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
      valid = false;
    }

    setPasswordErrors(newErrors);
    return valid;
  };

  const handlePasswordSubmit = async () => {
    if (!validatePasswordChange()) return;

    changePassword(
      {
        currentPassword: passwordData.oldPassword,
        newPassword: passwordData.confirmPassword,
      },
      {
        onSuccess: () => {
          setIsChangingPassword(false);
          setPasswordData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          showNotification("Password changed successfully", "success");
        },
        onError: (error) => {
          setPasswordErrors({
            ...passwordErrors,
            oldPassword: error.message || "Failed to change password",
          });
          showNotification(
            error.message || "Failed to change password",
            "error"
          );
        },
      }
    );
  };

  const cancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordErrors({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
    navigate("/");
  };

  if (isProfileLoading) {
    return <AppLoader />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        {/* Notification Toast */}
        {notification && (
          <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
              notification.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {notification.message}
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-[#2E8B57] flex items-center justify-center text-white text-xl font-semibold">
                        {profile?.firstName?.charAt(0).toUpperCase()}
                        {profile?.lastName?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <button
                      className="absolute bottom-0 right-0 bg-gray-100 rounded-full p-1 border border-gray-300"
                      aria-label="Edit profile"
                    >
                      <Edit className="h-3 w-3 text-gray-600" />
                    </button>
                  </div>
                  <div className="ml-4">
                    <h2 className="font-semibold text-lg">
                      {profile?.firstName}
                    </h2>
                    <p className="text-gray-500 text-sm">{profile?.email}</p>
                  </div>
                </div>

                <nav className="mt-6 space-y-1">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center justify-between py-3 px-4 rounded-md ${
                      activeTab === "profile"
                        ? "bg-green-50 text-[#2E8B57]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-3" />
                      <span>My Account</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => navigate("/orders")}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <Package className="h-5 w-5 mr-3" />
                      <span>Orders</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => navigate("/cart")}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-3" />
                      <span>Cart</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => navigate("/wishlist")}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <Heart className="h-5 w-5 mr-3" />
                      <span>Wishlist</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => navigate("/addresses")}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3" />
                      <span>Addresses</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => navigate("/payment-methods")}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-3" />
                      <span>Payment Methods</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <div className="border-t border-gray-200 pt-2 mt-2"></div>

                  <button
                    onClick={() => navigate("/notifications")}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 mr-3" />
                      <span>Notifications</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => navigate("/settings")}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <Settings className="h-5 w-5 mr-3" />
                      <span>Settings</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => navigate("/help")}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <HelpCircle className="h-5 w-5 mr-3" />
                      <span>Help Center</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center mt-4 py-3 px-4 rounded-md text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Log Out</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Profile Header */}
                <div className="bg-[#2E8B57] p-6 text-white">
                  <h1 className="text-2xl font-bold">My Account</h1>
                  <p className="text-gray-100">
                    Manage your account details and preferences
                  </p>
                </div>

                {/* Profile Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6">
                    {/* Combined Account Info and Security Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Personal Information */}
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-semibold">
                            Personal Information
                          </h2>
                          {!isEditing ? (
                            <button
                              onClick={() => setIsEditing(true)}
                              className="text-sm text-[#2E8B57] hover:underline flex items-center"
                              disabled={isUpdating}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </button>
                          ) : (
                            <div className="flex space-x-2">
                              <button
                                onClick={handleSave}
                                className="text-sm bg-[#2E8B57] text-white px-3 py-1 rounded flex items-center"
                                disabled={isUpdating}
                              >
                                {isUpdating ? (
                                  "Saving..."
                                ) : (
                                  <>
                                    <Check className="h-4 w-4 mr-1" />
                                    Save
                                  </>
                                )}
                              </button>
                              <button
                                onClick={handleCancel}
                                className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded flex items-center"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-500">
                              First Name
                            </label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="firstName"
                                value={editData.firstName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E8B57] focus:border-[#2E8B57] sm:text-sm"
                                disabled={isUpdating}
                              />
                            ) : (
                              <p className="mt-1 text-gray-900 font-medium">
                                {profile?.firstName}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-500">
                              Last Name
                            </label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="lastName"
                                value={editData.lastName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E8B57] focus:border-[#2E8B57] sm:text-sm"
                                disabled={isUpdating}
                              />
                            ) : (
                              <p className="mt-1 text-gray-900 font-medium">
                                {profile?.lastName}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-500">
                              Email
                            </label>
                            {isEditing ? (
                              <input
                                type="email"
                                name="email"
                                value={editData.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E8B57] focus:border-[#2E8B57] sm:text-sm"
                                disabled={isUpdating}
                              />
                            ) : (
                              <p className="mt-1 text-gray-900 font-medium">
                                {profile?.email}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-500">
                              Phone
                            </label>
                            {isEditing ? (
                              <input
                                type="tel"
                                name="phone"
                                value={editData.phone}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E8B57] focus:border-[#2E8B57] sm:text-sm"
                                placeholder="Add phone number"
                                disabled={isUpdating}
                              />
                            ) : (
                              <p className="mt-1 text-gray-900 font-medium">
                                {profile?.phoneNumber || "Not specified"}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-500">
                              Account Type
                            </label>
                            <p className="mt-1 text-gray-900 font-medium">
                              {user?.userType}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Security Section */}
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-semibold">Security</h2>
                        </div>

                        {/* Password Change Section */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium flex items-center">
                              <Lock className="h-5 w-5 mr-2 text-[#2E8B57]" />
                              Password
                            </h3>
                            {!isChangingPassword ? (
                              <button
                                onClick={() => setIsChangingPassword(true)}
                                className="text-sm text-[#2E8B57] hover:underline flex items-center"
                                disabled={isChanging}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Change
                              </button>
                            ) : (
                              <div className="flex space-x-2">
                                <button
                                  onClick={handlePasswordSubmit}
                                  className="text-sm bg-[#2E8B57] text-white px-3 py-1 rounded flex items-center"
                                  disabled={isChanging}
                                >
                                  {isChanging ? (
                                    "Saving..."
                                  ) : (
                                    <>
                                      <Check className="h-4 w-4 mr-1" />
                                      Save
                                    </>
                                  )}
                                </button>
                                <button
                                  onClick={cancelPasswordChange}
                                  className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded flex items-center"
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Cancel
                                </button>
                              </div>
                            )}
                          </div>

                          {isChangingPassword ? (
                            <div className="space-y-4">
                              <div>
                                <label
                                  htmlFor="oldPassword"
                                  className="block text-sm font-medium text-gray-500"
                                >
                                  Current Password
                                </label>
                                <input
                                  type="password"
                                  id="oldPassword"
                                  name="oldPassword"
                                  value={passwordData.oldPassword}
                                  onChange={handlePasswordChange}
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E8B57] focus:border-[#2E8B57] sm:text-sm"
                                  disabled={isChanging}
                                />
                                {passwordErrors.oldPassword && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {passwordErrors.oldPassword}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label
                                  htmlFor="newPassword"
                                  className="block text-sm font-medium text-gray-500"
                                >
                                  New Password
                                </label>
                                <input
                                  type="password"
                                  id="newPassword"
                                  name="newPassword"
                                  value={passwordData.newPassword}
                                  onChange={handlePasswordChange}
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E8B57] focus:border-[#2E8B57] sm:text-sm"
                                  disabled={isChanging}
                                />
                                {passwordErrors.newPassword && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {passwordErrors.newPassword}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label
                                  htmlFor="confirmPassword"
                                  className="block text-sm font-medium text-gray-500"
                                >
                                  Confirm New Password
                                </label>
                                <input
                                  type="password"
                                  id="confirmPassword"
                                  name="confirmPassword"
                                  value={passwordData.confirmPassword}
                                  onChange={handlePasswordChange}
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E8B57] focus:border-[#2E8B57] sm:text-sm"
                                  disabled={isChanging}
                                />
                                {passwordErrors.confirmPassword && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {passwordErrors.confirmPassword}
                                  </p>
                                )}
                              </div>

                              <div className="text-sm text-gray-500">
                                <p>Password requirements:</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                  <li
                                    className={
                                      passwordData.newPassword.length >= 8
                                        ? "text-green-600"
                                        : ""
                                    }
                                  >
                                    Minimum 8 characters
                                  </li>
                                  <li
                                    className={
                                      /[A-Z]/.test(passwordData.newPassword)
                                        ? "text-green-600"
                                        : ""
                                    }
                                  >
                                    At least one uppercase letter
                                  </li>
                                  <li
                                    className={
                                      /[0-9]/.test(passwordData.newPassword)
                                        ? "text-green-600"
                                        : ""
                                    }
                                  >
                                    At least one number
                                  </li>
                                  <li
                                    className={
                                      /[^A-Za-z0-9]/.test(
                                        passwordData.newPassword
                                      )
                                        ? "text-green-600"
                                        : ""
                                    }
                                  >
                                    At least one special character
                                  </li>
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200">
                              <span className="text-gray-600">
                                ••••••••••••
                              </span>
                              <span className="text-sm text-gray-500">
                                Last changed:{" "}
                                {user?.passwordChangedAt
                                  ? new Date(
                                      user.passwordChangedAt
                                    ).toLocaleDateString()
                                  : "Never"}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Session Management */}
                        <div>
                          <h3 className="font-medium mb-2">Active Sessions</h3>
                          <div className="p-3 bg-white rounded-md border border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Current Session</p>
                                <p className="text-sm text-gray-500">
                                  {new Date().toLocaleString()} •{" "}
                                  {navigator.userAgent.split(" ")[0]}
                                </p>
                              </div>
                              <button className="text-sm text-red-600 hover:underline">
                                Sign out other devices
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Orders and Addresses Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Recent Orders Summary */}
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-semibold">
                            Recent Orders
                          </h2>
                          <button
                            onClick={() => navigate("/orders")}
                            className="text-sm text-[#2E8B57] hover:underline"
                          >
                            View All
                          </button>
                        </div>

                        {profile?.recentOrders?.length > 0 ? (
                          <div className="space-y-3">
                            {profile?.recentOrders.map((order) => (
                              <div
                                key={order.id}
                                onClick={() => navigate(`/orders/${order.id}`)}
                                className="flex justify-between items-center p-3 bg-white rounded-md border border-gray-100 cursor-pointer hover:shadow-sm"
                              >
                                <div>
                                  <p className="font-medium">
                                    {order.orderNumber}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {order.orderDate}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold">
                                    GHC{order.totalAmount}
                                  </p>
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full ${
                                      order.status === "DELIVERED"
                                        ? "bg-green-100 text-green-800"
                                        : order.status === "PROCESSING"
                                        ? "bg-blue-100 text-blue-800"
                                        : order.status === "SHIPPED"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : order.status === "CANCELLED"
                                        ? "bg-red-100 text-red-800"
                                        : order.status === "PENDING"
                                        ? "bg-gray-100 text-gray-800"
                                        : "bg-red-100 text-brown-800"
                                    }`}
                                  >
                                    {order.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-gray-500">
                            <Package className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                            <p>No recent orders</p>
                            <button
                              onClick={() => navigate("/products")}
                              className="mt-2 text-[#2E8B57] hover:underline"
                            >
                              Browse Products
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Saved Addresses Summary */}
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-semibold">
                            Shipping Addresses
                          </h2>
                          <button
                            onClick={() => navigate("/addresses")}
                            className="text-sm text-[#2E8B57] hover:underline flex items-center"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Manage
                          </button>
                        </div>

                        {profile?.addresses && profile.addresses.length > 0 ? (
                          <div className="space-y-3">
                            {profile.addresses.slice(0, 1).map((address) => (
                              <div
                                key={address.id}
                                className="p-3 bg-white rounded-md border border-gray-100"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="font-medium">
                                      {address.city}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                      {address.street}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {address.region} {address.postalCode}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {address.country}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                      {profile.phoneNumber}
                                    </p>
                                  </div>
                                  {address.isDefault && (
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                      Default
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                            {profile.addresses.length > 1 && (
                              <button
                                onClick={() => navigate("/addresses")}
                                className="text-sm text-gray-500 hover:underline"
                              >
                                +{profile.addresses.length - 1} more address(es)
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-gray-500">
                            <MapPin className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                            <p>No addresses saved</p>
                            <button
                              onClick={() => navigate("/addresses/new")}
                              className="mt-2 text-[#2E8B57] hover:underline"
                            >
                              Add Address
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h2 className="text-xl font-semibold mb-4">
                        Quick Actions
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <button
                          onClick={() => navigate("/cart")}
                          className="flex flex-col items-center justify-center p-4 bg-white rounded-md border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <ShoppingCart className="h-6 w-6 text-[#2E8B57] mb-2" />
                          <span className="text-sm font-medium">View Cart</span>
                        </button>

                        <button
                          onClick={() => navigate("/orders")}
                          className="flex flex-col items-center justify-center p-4 bg-white rounded-md border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <Package className="h-6 w-6 text-[#2E8B57] mb-2" />
                          <span className="text-sm font-medium">Orders</span>
                        </button>

                        <button
                          onClick={() => navigate("/wishlist")}
                          className="flex flex-col items-center justify-center p-4 bg-white rounded-md border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <Heart className="h-6 w-6 text-[#2E8B57] mb-2" />
                          <span className="text-sm font-medium">Wishlist</span>
                        </button>

                        <button
                          onClick={() => navigate("/payment-methods")}
                          className="flex flex-col items-center justify-center p-4 bg-white rounded-md border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <CreditCard className="h-6 w-6 text-[#2E8B57] mb-2" />
                          <span className="text-sm font-medium">Payment</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
