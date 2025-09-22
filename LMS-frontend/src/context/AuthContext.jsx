
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Token state from localStorage
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );

  //  Backend base URL from .env
  const BASE_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // -------- Auto load user if token exists --------
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  // -------- Login --------
  const login = async (email, password) => {
    const { data } = await axios.post(`${BASE_URL}/api/auth/login`, {
      email,
      password,
    });

    //  Save in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    //  Update state
    setToken(data.token);
    setUser(data.user);

    return data.user;
  };

  // -------- Register Student --------
  const registerStudent = async (name, email, password, phone) => {
    const { data } = await axios.post(`${BASE_URL}/api/auth/register-student`, {
      name,
      email,
      password,
      phone,
    });
    return data;
  };

  // -------- Logout --------
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,      
        setToken,    
        login,
        registerStudent,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//  Hook for easy access
export const useAuth = () => useContext(AuthContext);
