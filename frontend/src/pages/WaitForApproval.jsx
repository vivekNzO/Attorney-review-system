import React from "react";
import { FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const WaitForApproval = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <FiClock className="text-6xl text-yellow-500 mx-auto mb-4 animate-pulse" />
        <h1 className="text-2xl font-bold mb-2">Account Pending Approval</h1>
        <p className="text-gray-600 mb-6">
          Your signup request has been sent and is awaiting admin approval. 
          You will be notified once your account is approved.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
          onClick={() => navigate("/login")}
        >
          Go to Login Page
        </button>
      </div>
    </div>
  );
};

export default WaitForApproval;
