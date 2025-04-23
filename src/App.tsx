import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import routerConfig from "./utils/router/index";
import Footer from "@/components/Footer";
import AppLoader from "./components/AppLoader";
import NotFound from "./pages/404";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {routerConfig.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <React.Suspense fallback={<AppLoader />}>
                        {route.element}
                      </React.Suspense>
                    }
                    loader={route.loader}
                  />
                ))}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;