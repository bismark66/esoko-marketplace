import NotFound from "@/pages/404";
import routerConfig from "@/utils/router";
import PrivateRoute from "@/utils/router/protectedRoute";
import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import AppLoader from "./AppLoader";
import Footer from "./Footer";
import Navbar from "./Navbar";

function LayoutHandler() {
  const location = useLocation();
  const noLayoutRoutes = ["/signin", "/signup", "/password-reset"];

  const isNoLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {isNoLayout ? (
        <Routes>
          {routerConfig.map((route, index) => {
            const Element = route.protected ? (
              <PrivateRoute>{route.element}</PrivateRoute>
            ) : (
              route.element
            );

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <React.Suspense fallback={<AppLoader />}>
                    {Element}
                  </React.Suspense>
                }
              />
            );
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {routerConfig.map((route, index) => {
                const Element = route.protected ? (
                  <PrivateRoute>{route.element}</PrivateRoute>
                ) : (
                  route.element
                );

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <React.Suspense fallback={<AppLoader />}>
                        {Element}
                      </React.Suspense>
                    }
                  />
                );
              })}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
export default LayoutHandler;
