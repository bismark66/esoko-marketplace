import {
  getAccessToken,
  getUser,
  setAccessToken,
  initializeAuth,
  clearTokens,
} from "@/utils/helpers";
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { LoginResponse, User } from "@/types";

interface AuthContextType {
  isAuthenticated: boolean;
  user: LoginResponse | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error?: string;
  dispatch: React.Dispatch<AuthAction>;
  isLoading?: boolean;
}

type AuthAction =
  | { type: "LOGIN"; payload: LoginResponse }
  | { type: "LOGOUT" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_LOADING"; payload: boolean };

const initialState: {
  isAuthenticated: boolean;
  user: LoginResponse | null;
  error?: string;
  userProfile: User | null;
  isLoading: boolean;
} = {
  isAuthenticated: false,
  user: null,
  error: undefined,
  userProfile: null,
  isLoading: true,
};

const authReducer = (
  state = initialState,
  action: AuthAction
): typeof initialState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: undefined,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: undefined,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: undefined };
    case "SET_USER":
      return { ...state, userProfile: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadAuthState = () => {
      try {
        const { token, user } = initializeAuth();

        if (token && user) {
          dispatch({ type: "LOGIN", payload: user });
          dispatch({ type: "SET_USER", payload: user.user });
          console.log("after inactivity");
        }
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        dispatch({
          type: "SET_ERROR",
          payload:
            error instanceof Error
              ? error.message
              : "Failed to load user session",
        });
      }
    };

    // Add event listener for storage changes
    window.addEventListener("storage", loadAuthState);
    loadAuthState(); // Initial load

    return () => {
      window.removeEventListener("storage", loadAuthState);
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: "CLEAR_ERROR" });

      // Replace with actual API call
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data: LoginResponse = await response.json();

      // Validate response structure
      if (!data.accessToken || !data.user) {
        throw new Error("Invalid login response");
      }

      setAccessToken(data.accessToken);
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
    } catch (error) {
      console.error("Login error:", error);
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Login failed",
      });
      throw error;
    }
  };

  const logout = () => {
    clearTokens();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        login,
        logout,
        error: state.error,
        dispatch,
        isLoading: state.isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
