import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { Product } from "../types/Product";
import { mockProducts } from "../data/mockProducts";

// Define types
interface CartItem {
  product: Product;
  quantity: number;
}

interface ShopState {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  isAuthenticated: boolean;
  user: null | { name: string; email: string };
  isLoading: boolean;
  searchQuery: string;
  categoryFilter: string;
}

type ShopAction =
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: { productId: number } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: number; quantity: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "ADD_TO_WISHLIST"; payload: { product: Product } }
  | { type: "REMOVE_FROM_WISHLIST"; payload: { productId: number } }
  | { type: "SET_SEARCH_QUERY"; payload: { query: string } }
  | { type: "SET_CATEGORY_FILTER"; payload: { category: string } }
  | { type: "LOGIN"; payload: { name: string; email: string } }
  | { type: "LOGOUT" };

// Create initial state
const initialState: ShopState = {
  products: mockProducts,
  cart: [],
  wishlist: [],
  isAuthenticated: false,
  user: null,
  isLoading: false,
  searchQuery: "",
  categoryFilter: "all",
};

// Create context
const ShopContext = createContext<
  | {
      state: ShopState;
      dispatch: React.Dispatch<ShopAction>;
    }
  | undefined
>(undefined);

// Reducer function
const shopReducer = (state: ShopState, action: ShopAction): ShopState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { product, quantity }],
        };
      }
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item.product.id !== action.payload.productId
        ),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    case "ADD_TO_WISHLIST": {
      const { product } = action.payload;
      const isInWishlist = state.wishlist.some(
        (item) => item.id === product.id
      );

      if (isInWishlist) {
        return state;
      }

      return {
        ...state,
        wishlist: [...state.wishlist, product],
      };
    }

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (product) => product.id !== action.payload.productId
        ),
      };

    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload.query,
      };

    case "SET_CATEGORY_FILTER":
      return {
        ...state,
        categoryFilter: action.payload.category,
      };

    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: { name: action.payload.name, email: action.payload.email },
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

// Provider component
export const ShopProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Try to load cart from localStorage
  const loadState = (): ShopState => {
    try {
      const cartData = localStorage.getItem("cart");
      const wishlistData = localStorage.getItem("wishlist");
      const userData = localStorage.getItem("user");

      return {
        ...initialState,
        cart: cartData ? JSON.parse(cartData) : [],
        wishlist: wishlistData ? JSON.parse(wishlistData) : [],
        user: userData ? JSON.parse(userData) : null,
        isAuthenticated: Boolean(userData),
      };
    } catch (error) {
      console.error("Error loading state from localStorage:", error);
      return initialState;
    }
  };

  const [state, dispatch] = useReducer(shopReducer, loadState());

  // Save cart to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      if (state.user) {
        localStorage.setItem("user", JSON.stringify(state.user));
      } else {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Error saving state to localStorage:", error);
    }
  }, [state.cart, state.wishlist, state.user]);

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};

// Custom hook for using the shop context
export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
