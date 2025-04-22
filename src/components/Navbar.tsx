import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, User, LogIn, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    state: { cartItems },
  } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-[#2E8B57]">
              Esoko MarketPlace
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-700 hover:text-[#2E8B57] px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-[#2E8B57] border-b-2 border-[#2E8B57]"
                  : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`text-gray-700 hover:text-[#2E8B57] px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/products")
                  ? "text-[#2E8B57] border-b-2 border-[#2E8B57]"
                  : ""
              }`}
            >
              Products
            </Link>
            {isAuthenticated && (
              <Link
                to="/track-order"
                className={`text-gray-700 hover:text-[#2E8B57] px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/track-order" ? "text-[#2E8B57]" : ""
                }`}
              >
                Track Order
              </Link>
            )}
            <Link
              to="/contact"
              className={`text-gray-700 hover:text-[#2E8B57] px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/contact")
                  ? "text-[#2E8B57] border-b-2 border-[#2E8B57]"
                  : ""
              }`}
            >
              Contact
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-[#2E8B57]" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2E8B57] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center text-gray-700 hover:text-[#2E8B57]"
                >
                  <User className="h-5 w-5 mr-2" />
                  <span>{user?.name}</span>
                </Link>
                {/* <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-[#2E8B57]"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Logout</span>
                </button> */}
              </div>
            ) : (
              <Link
                to="/signin"
                className="flex items-center text-gray-700 hover:text-[#2E8B57]"
              >
                <User className="h-5 w-5 mr-2" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#2E8B57]"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/")
                  ? "text-[#2E8B57] bg-gray-100"
                  : "text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50"
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/products")
                  ? "text-[#2E8B57] bg-gray-100"
                  : "text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50"
              }`}
            >
              Products
            </Link>
            {isAuthenticated && (
              <Link
                to="/track-order"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/track-order"
                    ? "text-[#2E8B57]"
                    : "text-gray-700 hover:text-[#2E8B57]"
                }`}
              >
                Track Order
              </Link>
            )}
            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/contact")
                  ? "text-[#2E8B57] bg-gray-100"
                  : "text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50"
              }`}
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50"
            >
              Cart ({cartItems.length})
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50"
                >
                  Profile
                </Link>
                {/* <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50"
                >
                  Logout
                </button> */}
              </>
            ) : (
              <Link
                to="/signin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
