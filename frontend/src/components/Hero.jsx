import React, { useContext } from "react";
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

const Hero = () => {
    const navigate = useNavigate()
    const {authUser} = useContext(AuthContext)
  return (
    <div className="h-full flex">
      {/* left side content */}
      <div className="w-full h-full md:w-2/3 flex flex-col py-30 px-10 md:px-20">
        <div className="w-full">
          <p className="font-semibold text-[#D0B374]">Leave court to us</p>
          <h1 className="text-5xl font-extrabold mt-10"> Verified Reviews, Transparent Feedback, Professional Accountability — <span className="text-[#D0B374]">All in One Place.</span> </h1>
          <p className="text-white font-normal mt-5">Sign up today to join a professional network built on honest feedback and verified reviews.</p>

        {!authUser && <div className="flex  gap-20 mt-10">
            <button className="bg-[#D0B374] cursor-pointer rounded-4xl px-4 py-4 text-black flex items-center gap-2 hover:bg-[#e2b44f]"
            onClick={()=>navigate("/signup")}
            >Join as Client <FaArrowRight /></button>
            <button  className="bg-[#D0B374] cursor-pointer rounded-4xl px-4 py-4 text-black flex items-center gap-2 hover:bg-[#e2b44f]"
            onClick={()=>navigate("/attorney-signup")}
            >Join as Attorney<FaArrowRight /></button>
          </div>
        }
        </div>
      </div>
      {/* right side */}
      <div className="hidden md:flex w-1/3 items-center justify-center">
        <div >
        <img
        className="mx-auto p-10"
        />
        </div>
      </div>
    </div>
  );
};

export default Hero;
