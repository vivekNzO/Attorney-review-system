import React from "react";
import { getRandomAvatar } from "../utils/avatar";
import { useNavigate } from "react-router-dom";

const ClientCard = ({item}) => {
    const navigate = useNavigate()
  return (
    <div
    onClick={()=>navigate(`/client-profile/${item.id}`)}
     className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 flex flex-col items-center hover:shadow-xl hover:border-gray-400">
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-gray-300 flex items-start justify-center ">
        <img src={getRandomAvatar()} />
      </div>
      <h2 className="text-lg font-bold mb-2 text-center">
        {item.user.firstName} {item.user.lastName}
      </h2>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Email: </span>
        {item.user.email}
      </p>

    </div>
  );
};

export default ClientCard;
