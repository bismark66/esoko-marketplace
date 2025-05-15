import React from "react";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Profile from "@/pages/Profile";
import ContactUs from "@/pages/ContactUs";
import SearchResults from "@/pages/SearchResults";
import TrackOrder from "@/pages/TrackOrder";
import Blog from "@/pages/Blog";
import ShippingReturns from "@/pages/ShippingReturns";
import FAQ from "@/pages/FAQ";
import About from "@/pages/About";
import Orders from "@/pages/Orders";
import OrderConfirmation from "@/pages/OrderConfirmation";
import ResetPasswordRequestPage from "@/pages/PasswordReset";

const routerConfig = [
  {
    path: "/",
    element: <Home />,
    exact: true,
    loader: () => "", // Add api call here
    protected: false,
  },
  {
    path: "/products",
    element: <Products />,
    exact: true,
    loader: () => "",
    protected: false,
  },
  {
    path: "/cart",
    element: <Cart />,
    exact: () => "",
    loader: () => "",
    protected: false,
  },
  {
    path: "/checkout",
    element: <Checkout />,
    exact: true,
    loader: () => "",
    protected: true,
  },
  {
    path: "/signin",
    element: <SignIn />,
    exact: true,
    loader: undefined,
    protected: false,
  },
  {
    path: "/signup",
    element: <SignUp />,
    exact: true,
    loader: undefined,
    protected: false,
  },
  {
    path: "/profile",
    element: <Profile />,
    exact: true,
    loader: () => "",
    protected: true,
  },
  {
    path: "/contact",
    element: <ContactUs />,
    exact: true,
    loader: undefined,
    protected: false,
  },
  {
    path: "/search",
    element: <SearchResults />,
    exact: true,
    loader: () => "",
    protected: false,
  },
  {
    path: "/track-order",
    element: <TrackOrder />,
    exact: true,
    loader: () => "",
    protected: true,
  },
  {
    path: "/blog",
    element: <Blog />,
    exact: true,
    loader: () => "",
    protected: false,
  },
  {
    path: "/shipping-returns",
    element: <ShippingReturns />,
    exact: true,
    loader: undefined,
    protected: false,
  },
  {
    path: "/faq",
    element: <FAQ />,
    exact: true,
    loader: undefined,
    protected: false,
  },
  {
    path: "/about",
    element: <About />,
    exact: true,
    loader: undefined,
    protected: false,
  },
  {
    path: "/orders",
    element: <Orders />,
    exact: true,
    loader: () => "",
    protected: true,
  },
  {
    path: "/order-confirmation",
    element: <OrderConfirmation />,
    exact: true,
    loader: () => "",
    protected: true,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
    exact: true,
    loader: () => "",
    protected: false,
  },
  {
    path: "/password-reset",
    element: <ResetPasswordRequestPage />,
    exact: true,
    loader: () => "",
    protected: false,
  },
];

export default routerConfig;
