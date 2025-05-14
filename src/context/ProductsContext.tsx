import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { ProductState } from "@/types";



type ProductAction =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_CATEGORY_FILTER"; payload: string }
  | { type: "CLEAR_FILTERS" };

const initialState: ProductState = {
  products: mockProducts,
  filteredProducts: mockProducts,
  loading: false,
  error: null,
  searchQuery: "",
  categoryFilter: "all",
};

const ProductContext = createContext<
  | {
      state: ProductState;
      dispatch: React.Dispatch<ProductAction>;
    }
  | undefined
>(undefined);

const filterProducts = (
  products: Product[],
  searchQuery: string,
  category: string
): Product[] => {
  return products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });
};

const productReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        filteredProducts: filterProducts(
          action.payload,
          state.searchQuery,
          state.categoryFilter
        ),
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
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
        filteredProducts: filterProducts(
          state.products,
          action.payload,
          state.categoryFilter
        ),
      };
    case "SET_CATEGORY_FILTER":
      return {
        ...state,
        categoryFilter: action.payload,
        filteredProducts: filterProducts(
          state.products,
          state.searchQuery,
          action.payload
        ),
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        searchQuery: "",
        categoryFilter: "all",
        filteredProducts: state.products,
      };
    default:
      return state;
  }
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
