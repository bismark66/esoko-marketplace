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

const routerConfig = [
  {
    path: "/",
    element: <Home />,
    exact: true,
    loader: () => "", // Add api call here
  },
  {
    path: "/products",
    element: <Products />,
    exact: true,
    loader: () => "",
  },
  {
    path: "/cart",
    element: <Cart />,
    exact: () => "",
    loader: () => "",
  },
  {
    path: "/checkout",
    element: <Checkout />,
    exact: true,
    loader: () => "",
  },
  {
    path: "/signin",
    element: <SignIn />,
    exact: true,
    loader: undefined,
  },
  {
    path: "/signup",
    element: <SignUp />,
    exact: true,
    loader: undefined,
  },
  {
    path: "/profile",
    element: <Profile />,
    exact: true,
    loader: () => "",
  },
  {
    path: "/contact",
    element: <ContactUs />,
    exact: true,
    loader: undefined,
  },
  {
    path: "/search",
    element: <SearchResults />,
    exact: true,
    loader: () => "",
  },
  {
    path: "/track-order",
    element: <TrackOrder />,
    exact: true,
    loader: () => "",
  },
  {
    path: "/blog",
    element: <Blog />,
    exact: true,
    loader: () => "",
  },
  {
    path: "/shipping-returns",
    element: <ShippingReturns />,
    exact: true,
    loader: undefined,
  },
  {
    path: "/faq",
    element: <FAQ />,
    exact: true,
    loader: undefined,
  },
  {
    path: "/about",
    element: <About />,
    exact: true,
    loader: undefined,
  },
  {
    path: "/orders",
    element: <Orders />,
    exact: true,
    loader: () => "",
  },
  {
    path: "/order-confirmation",
    element: <OrderConfirmation />,
    exact: true,
    loader: () => "",
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
    exact: true,
    loader: () => "",
  },
];

export default routerConfig;
