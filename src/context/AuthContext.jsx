import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {api} from "../services/api.js"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const registerUser = async (username, email, password) => {
    setLoading(true);
    try {
      console.log("Sending request to register user...");
      const res = await api.post(
        "/",
        { username, email, password },
        { withCredentials: true }
      );
      const data = res.data;
      console.log(data);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.log(`Unable to register the user ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post(
        "/auth",
        { email, password },
        { withCredentials: true }
      );
      const data = res.data;
      console.log(data);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
    return { success: false, message: "Enter valid email and password" };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await api.post("/logout", {}, { withCredentials: true });
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(`This the error message ${error}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        logoutUser,
        loading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
