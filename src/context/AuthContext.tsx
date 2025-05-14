import { getAccessToken, getUser, setAccessToken } from "@/utils/helpers";
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
}

type AuthAction =
  | { type: "LOGIN"; payload: LoginResponse }
  | { type: "LOGOUT" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_USER"; payload: User | null };

const initialState: {
  isAuthenticated: boolean;
  user: LoginResponse | null;
  error?: string;
  userProfile: User | null;
} = {
  isAuthenticated: false,
  user: null,
  error: undefined,
  userProfile: null,
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
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = getAccessToken();
        const user = getUser();

        if (token && user) {
          // First check if user is already a parsed object
          let parsedUser: User;
          if (typeof user === "string") {
            parsedUser = JSON.parse(user);
          } else if (typeof user === "object" && user !== null) {
            parsedUser = user as User;
          } else {
            throw new Error("Invalid user data format");
          }

          if (parsedUser?.email) {
            dispatch({ type: "LOGIN", payload: parsedUser });
          }
        }
      } catch (error) {
        // Clear invalid stored data
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

    initializeAuth();
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
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch({ type: "LOGIN", payload: data.user });
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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};