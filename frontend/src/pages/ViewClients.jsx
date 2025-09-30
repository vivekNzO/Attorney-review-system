import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import Card from "../components/Card";
import ClientCard from "../components/ClientCard";
import Pagination from "../components/Pagination";

const ViewClients = () => {
  const [data, setData] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [filteredClients, setFilteredClients] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const fetchClients = async () => {
    try {
      const res = await API.get("/client");
      setData(res.data);
      setFilteredClients(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const filtered = data.filter((client) =>
      client.user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
    setFilteredClients(filtered);
    setCurrentPage(1);
  }, [data, searchEmail]);

  useEffect(() => {
    console.log(filteredClients);
  }, []);


  const totalPages = Math.ceil(filteredClients.length/itemsPerPage)
  const endIndex = currentPage*itemsPerPage
  const startIndex = endIndex-itemsPerPage
  const clients = filteredClients.slice(startIndex,endIndex)

  if (data.length === 0) {
    return <p className="text-center text-2xl">No Clients Available</p>;
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
      {clients.length>8 && searchEmail.length===0 &&
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      }
    </div>
  );
};

export default ViewClients;
