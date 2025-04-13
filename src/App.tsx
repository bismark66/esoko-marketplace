import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import ContactUs from './pages/ContactUs';
import SearchResults from './pages/SearchResults';
import TrackOrder from './pages/TrackOrder';
import Footer from './components/Footer';
import Blog from './pages/Blog';
import ShippingReturns from './pages/ShippingReturns';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Orders from './pages/Orders';
import OrderConfirmation from './pages/OrderConfirmation';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/shipping-returns" element={<ShippingReturns />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about" element={<About />} />
                <Route path="/orders" element={<Orders />} />
                <Route path='/order-confirmation' element={<OrderConfirmation/>}/>
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