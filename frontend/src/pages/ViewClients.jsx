import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import Card from "../components/Card";
import ClientCard from "../components/ClientCard";

const ViewClients = () => {
  const [data, setData] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [filteredClients,setFilteredClients]=useState('')
  const fetchClients = async () => {
    try {
      const res = await API.get("/client");
      setData(res.data);
      setFilteredClients(res.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchClients();
  }, []);
  useEffect(() => {
    const filtered = data.filter((client)=>
        client.user.email.toLowerCase().includes(searchEmail.toLowerCase())
    )
    setFilteredClients(filtered)
  }, [data,searchEmail]);

  useEffect(()=>{
    console.log(filteredClients)
  },[])

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredClients.map((item) => (
          <ClientCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ViewClients;
