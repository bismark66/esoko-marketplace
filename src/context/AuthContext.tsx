import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

// Types
interface DeviceType {
  model: string;
  deviceOSVersion: string;
  platform: string;
}

interface UserType {
  email: string;
  name: string;
  deviceId?: string;
  deviceInfo?: DeviceType;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

type AuthAction =
  | { type: "LOGIN"; payload: UserType }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; payload: UserType | null }
  | { type: "RESET" };

// Initial State
const initialState: Omit<AuthContextType, "login" | "logout"> = {
  isAuthenticated: false,
  user: null,
};

// Reducer
const authReducer = (
  state: typeof initialState,
  action: AuthAction
): typeof initialState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
    case "RESET":
      return { ...state, isAuthenticated: false, user: null };
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: UserType = JSON.parse(storedUser);
      dispatch({ type: "LOGIN", payload: parsedUser });
    }
  }, []);

  // login
  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData: UserType = {
        email,
        name: email.split("@")[0],
      };

      localStorage.setItem("user", JSON.stringify(userData));
      dispatch({ type: "LOGIN", payload: userData });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart"); // also clears cart
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
