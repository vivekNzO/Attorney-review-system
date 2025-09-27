import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res  = await API.post("/auth/signup",form)
      toast.success("Sign Up successful")
    } catch (error) {
      console.log(error.message)
      toast.error("Something went wrong")
    }
  };

  return (
    <div className="min-h-[calc(100vh-84px)] flex">
      {/* left side form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-10 lg:px-20 bg-white">
        <div className="w-full max-w-md ">
          <h1 className="text-3xl font-bold mb-2 text-center">Create an account</h1>
          <p className="text-gray-500 mb-6 text-center">
            Join us and start managing your work better
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2  focus:ring-black/50"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2  focus:ring-black/50"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                   className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2  focus:ring-black/50"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2  focus:ring-black/50"
              />
            </div>
            <button type="submit" className="w-full bg-black/80 text-white hover:bg-black font-semibold py-2 rounded-xl transition-colors ">Sign up</button>
          </form>
          <div className="text-center mt-6">
            <span>Already have an account? </span><span className="text-red-500 hover:underline cursor-pointer" onClick={()=>navigate("/login")}>Log in</span>
            <p>or</p>
            <span>Register as an attorney. </span><span className="text-red-500 hover:underline cursor-pointer" onClick={()=>navigate("/attorney-signup")}>Click here</span>
          </div>
        </div>


      </div>

      {/* Right side illustration */}
      <div className="hidden md:flex bg-[#F5EBE1] w-1/2 items-center justify-center p-10">
        <div className="text-center">
            <img
                src="/law1.jpg"
                className="mx-auto w-auto"
            />
            <h2 className="text-2xl font-semibold mt-6">
                Your Legal Journey Starts Here.
            </h2>
            <p className="text-gray-600 mt-2">We make it simple for you to find the right attorney, based on what truly matters – real client experiences.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
