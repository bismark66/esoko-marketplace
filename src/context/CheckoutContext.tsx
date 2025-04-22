import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface CheckoutState {
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethod | null;
  loading: boolean;
  error: string | null;
  step: "shipping" | "payment" | "confirmation";
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentMethod {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

type CheckoutAction =
  | { type: "SET_SHIPPING_ADDRESS"; payload: ShippingAddress }
  | { type: "SET_PAYMENT_METHOD"; payload: PaymentMethod }
  | { type: "SET_STEP"; payload: CheckoutState["step"] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "RESET_CHECKOUT" };

const initialState: CheckoutState = {
  shippingAddress: null,
  paymentMethod: null,
  loading: false,
  error: null,
  step: "shipping",
};

const CheckoutContext = createContext<
  | {
      state: CheckoutState;
      dispatch: React.Dispatch<CheckoutAction>;
    }
  | undefined
>(undefined);

const checkoutReducer = (
  state: CheckoutState,
  action: CheckoutAction
): CheckoutState => {
  switch (action.type) {
    case "SET_SHIPPING_ADDRESS":
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case "SET_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case "SET_STEP":
      return {
        ...state,
        step: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "RESET_CHECKOUT":
      return initialState;
    default:
      return state;
  }
};

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
