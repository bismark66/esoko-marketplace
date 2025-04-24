import React, { useState } from "react";
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
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  // Mock recent order data - would come from an API in a real application
  const recentOrders = [
    { id: "ORD-5782", date: "2025-04-15", status: "Delivered", total: 832.5 },
    { id: "ORD-5643", date: "2025-04-02", status: "Processing", total: 156.25 },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    navigate("/signin");
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-[#2E8B57] flex items-center justify-center text-white text-xl font-semibold">
                        {user.name?.charAt(0).toUpperCase()}
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
                    <h2 className="font-semibold text-lg">{user.name}</h2>
                    <p className="text-gray-500 text-sm">{user.email}</p>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Account Information */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">
                          Personal Information
                        </h2>
                        <button
                          onClick={() => navigate("/profile/edit")}
                          className="text-sm text-[#2E8B57] hover:underline flex items-center"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Full Name
                          </label>
                          <p className="mt-1 text-gray-900 font-medium">
                            {user.name}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Email
                          </label>
                          <p className="mt-1 text-gray-900 font-medium">
                            {user.email}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Phone
                          </label>
                          <p className="mt-1 text-gray-900 font-medium">
                            {user.phone || "Not specified"}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Account Type
                          </label>
                          <p className="mt-1 text-gray-900 font-medium">
                            {user.accountType === "farmer"
                              ? "Farmer/Seller"
                              : "Buyer"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Orders Summary */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Recent Orders</h2>
                        <button
                          onClick={() => navigate("/orders")}
                          className="text-sm text-[#2E8B57] hover:underline"
                        >
                          View All
                        </button>
                      </div>

                      {recentOrders.length > 0 ? (
                        <div className="space-y-3">
                          {recentOrders.map((order) => (
                            <div
                              key={order.id}
                              onClick={() => navigate(`/orders/${order.id}`)}
                              className="flex justify-between items-center p-3 bg-white rounded-md border border-gray-100 cursor-pointer hover:shadow-sm"
                            >
                              <div>
                                <p className="font-medium">{order.id}</p>
                                <p className="text-sm text-gray-500">
                                  {order.date}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">
                                  ${order.total.toFixed(2)}
                                </p>
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-blue-100 text-blue-800"
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

                      {user.addresses && user.addresses.length > 0 ? (
                        <div className="space-y-3">
                          {user.addresses.slice(0, 1).map((address, index) => (
                            <div
                              key={index}
                              className="p-3 bg-white rounded-md border border-gray-100"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium">{address.name}</p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {address.street}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {address.city}, {address.state}{" "}
                                    {address.zip}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {address.country}
                                  </p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {address.phone}
                                  </p>
                                </div>
                                {address.default && (
                                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                          {user.addresses.length > 1 && (
                            <button
                              onClick={() => navigate("/addresses")}
                              className="text-sm text-gray-500 hover:underline"
                            >
                              +{user.addresses.length - 1} more address(es)
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

                    {/* Quick Actions */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h2 className="text-xl font-semibold mb-4">
                        Quick Actions
                      </h2>
                      <div className="grid grid-cols-2 gap-3">
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
