// AppProvider.tsx
import { AuthProvider, AuthContext, AuthContextType } from "./AuthContext";
import {
  CartProvider,
  CartContext,
  CartState,
  CartDispatch,
} from "./CartContext";
import { useRef, useContext, createContext } from "react";

const ResetContext = createContext({ resetAll: () => {} });

export const AppProvider = ({ children }) => {
  const authRef = useRef<AuthContextType | undefined>(undefined);
  const cartRef = useRef<
    { state: CartState; dispatch: CartDispatch } | undefined
  >(undefined);

  const ResetProvider = ({ children }) => {
    const auth = useContext(AuthContext);
    const cart = useContext(CartContext);

    authRef.current = auth;
    cartRef.current = cart;

    const resetAll = () => {
      authRef.current?.reset();
      cartRef.current?.dispatch?.({ type: "RESET_CART" });
      // add others here
    };

    return (
      <ResetContext.Provider value={{ resetAll }}>
        {children}
      </ResetContext.Provider>
    );
  };

  return (
    <AuthProvider>
      <CartProvider>
        <ResetProvider>{children}</ResetProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export const useResetAll = () => useContext(ResetContext);
