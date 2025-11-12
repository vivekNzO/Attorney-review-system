import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { login, authLoading } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div className="min-h-[calc(100vh-84px)] flex">
      {/* Left side illustration */}
      <div className="hidden md:flex w-1/2  items-center justify-center p-20 ">
        <div className="text-center">
          <img src="/law2.jpg" className="mx-auto" />
          <p className="text-gray-600 mt-2">
            Pick up where you left off — your legal journey continues here.
          </p>
        </div>
      </div>
      {/* Right side form */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-white px-10 lg:px-20">
        <div className="w-full max-w-md ">
          <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back!</h1>
          <p></p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/50"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/50"
              />
            </div>
            <button
            disabled={authLoading}
              type="submit"
              className="w-full bg-black/80 text-white hover:bg-black font-semibold py-2 rounded-xl transition-colors "
            >
              Log In
            </button>
          </form>
          <div className="text-center mt-6">
            <span>Don't have an account? </span>
            <span
              className="text-red-500 hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Register here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
