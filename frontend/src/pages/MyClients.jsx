import React, { useContext, useEffect, useState } from "react";
import API from "../utils/axios";
import Card from "../components/Card";
import ClientCard from "../components/ClientCard";
import Pagination from "../components/Pagination";
import Loading from "../Skeletons/Loading";
import { AttorneyContext } from "../store/AttorneyContext";

const MyClients = () => {

  const [searchEmail, setSearchEmail] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const {assignedClients,fetchAssignedClients} = useContext(AttorneyContext)

  useEffect(() => {
    fetchAssignedClients()
  }, []);

  useEffect(()=>{
    const filtered = assignedClients.filter((client)=>{
      const fullName = `${client.user.firstName}v${client.user.lastName}`.toLowerCase()
      const email = client.user.email.toLowerCase()
      const search = searchEmail.toLowerCase()
      return fullName.includes(search) || email.includes(search)
    })

    setFilteredClients(filtered)
    setCurrentPage(1)
  },[assignedClients,searchEmail])

  useEffect(() => {
    console.log("Assigned clients: ",assignedClients);
  }, []);


  const totalPages = Math.ceil(filteredClients.length/itemsPerPage)
  const endIndex = currentPage*itemsPerPage
  const startIndex = endIndex-itemsPerPage
  const clients = filteredClients.slice(startIndex,endIndex)

if (!assignedClients) {
  return <Loading />;
}

if (assignedClients.length === 0) {
  return <div className="text-center text-gray-500">No clients assigned yet</div>;
}
  return (
    <div className="min-h-[calc(100vh-84px)] p-20">
      <div className="flex items-center justify-center mb-10">
        <input
          type="text"
          placeholder="Search Client by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="border p-2 rounded-lg w-1/3"
        />
      </div>

      {clients.length===0 && 
      <div className="flex items-center justify-center">
        Not found
      </div>
      }
      <div className="text-black min-h-11/12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {clients.map((item) => (
          <ClientCard key={item.id} item={item} />
        ))}
      </div>
      </div>
      {clients.length>0 && searchEmail.length===0 &&
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      }
    </div>
  );
};

export default MyClients;
