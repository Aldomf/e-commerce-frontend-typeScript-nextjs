// Import necessary modules
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

// Define interfaces
interface User {
  id: string;
  email: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  signup: (email: string, password: string, username: string) => Promise<void>;
  signupError: string | string[];
  loginError: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context
export const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<string>("");
  const [signupError, setSignupError] = useState<string | string[]>([]);
  const [token, setToken] = useState<string | null>(() => {
    // Initialize token from localStorage if it exists
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || null;
    }
    return null;
  });

  useEffect(() => {
    // Fetch user data from localStorage on component mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to handle signup
  const signup = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        {
          username,
          email,
          password,
        }
      );
      toast.success("Signed up successfully!", {
        duration: 3000,
      });
      setSignupError([]); // Clear any previous signup errors
      router.push("/login");
      router.refresh();
    } catch (error: any) {
      console.error("Signup error:", error);
      if (Array.isArray(error.response?.data.message)) {
        setSignupError(error.response?.data.message);
      } else if (typeof error.response?.data.message === 'string') {
        setSignupError([error.response?.data.message]);
      } else {
        setSignupError(["An unknown error occurred"]);
      }
    }
  };
  


  // Function to handle login
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password }
      );
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      // Store token in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Logged in successfully!", {
        duration: 3000,
      });
      setLoginError("")
      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.error("Login error:", error);
      setLoginError(error.response?.data.message);
      console.log(error.response?.data.message);
    }
  };

  // Function to handle logout
  const logout = () => {
    // Clear token from state and localStorage
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
    setTimeout(() => {
        window.location.reload();
    }, 1000);
  };

  // Value to be provided by the context
  const contextValue: AuthContextType = {
    user,
    token,
    loginError,
    signup,
    signupError,
    login,
    logout, // Include logout function in the context
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
