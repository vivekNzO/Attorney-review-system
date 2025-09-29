import { createContext, useEffect, useState } from "react";
import API from "../utils/axios.js";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async (req, res) => {
      setLoading(true);
      try {
        const res = await API.get("/auth/profile");
        setAuthUser(res.data);
      } catch (error) {
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const signup = async(formData)=>{
    try {
        const res = await API.post("/auth/signup",formData)
        setAuthUser(res.data.user)
        toast.success(res.data.message)
        return {success:true,data:res.data}
    } catch (error) {
        toast.error(error.response.data.message)
        return {success:false,error:error.response?.data?.message}
    }
  }

  const login = async(formData)=>{
    try {
        const res = await API.post("/auth/login",formData)
        setAuthUser(res.data.user)
        toast.success("Logged In Successfully")
        return res.data
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
  }

  const logout = async()=>{
    try {
        await API.post("/auth/logout")
        setAuthUser(null)
        toast.success("Logged out successfully")
    } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
    }
  }

  return (
    <AuthContext.Provider value={{ authUser, loading,signup,logout,login}}>
      {children}
    </AuthContext.Provider>
  );
};
