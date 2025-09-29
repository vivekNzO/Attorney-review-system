import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../store/AdminContext";
import Loading from "../Skeletons/Loading";
import Card from "../components/Card";

const PendingRequests = () => {

  const {
    data,setData,
    loading,
    fetchPendingAttorneyRequests
  } = useContext(AdminContext);
  useEffect(() => {
    const loadData = async () => {
      const res = await fetchPendingAttorneyRequests();
    };
    loadData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="min-h-[calc(100vh-84px)] p-20">
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No pending requests</p>
      ) : (
        <div>
          <h1 className="text-center text-2xl font-semibold mb-10">
            Hi Admin, here are the pending approvals
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item)=>(
            <Card key={item.id} item={item}/>
          ))}
          </div>
        </div>
      )}
      <div className="bg-red-500"></div>
    </div>
  );
};

export default PendingRequests;
