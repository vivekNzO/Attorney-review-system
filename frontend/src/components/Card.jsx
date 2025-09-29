import React, { useContext } from "react";
import { AdminContext } from "../store/AdminContext";
import { getRandomAvatar } from "../utils/avatar";

const Card = ({ item }) => {

    const {handleAttorneyApproval,handleAttorneyRejection} = useContext(AdminContext)
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 flex flex-col items-center">
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-gray-300 flex items-start justify-center ">
        <img src={getRandomAvatar()} />
      </div>
      <h2 className="text-lg font-bold mb-2 text-center">
        {item.firstName} {item.lastName}
      </h2>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Email: </span>
        {item.email}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">License Number: </span>
        {item.licenseNumber}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Requested on: {new Date(item.createdAt).toLocaleDateString()}
      </p>
      <div className="flex gap-3 w-full">
        <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition cursor-pointer"
        onClick={()=>handleAttorneyApproval(item.id)}
        >Approve</button>
        <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition cursor-pointer"
        onClick={()=>handleAttorneyRejection(item.id)}
        >Reject</button>
      </div>
    </div>
  );
};

export default Card;
