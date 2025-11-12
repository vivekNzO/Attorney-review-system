import { createContext, useState } from "react";
import API from "../utils/axios";
import toast from "react-hot-toast";

export const AttorneyContext = createContext()

export const AttorneyProvider = ({children})=>{

    const [assignedClients,setAssignedClients] = useState([])
    const handleAddClient = async(clientEmail)=>{
        console.log(clientEmail)
        try {
            const res = await API.post("/attorney/add-client",{clientEmail})
            setAssignedClients((prev)=>[...prev,res.data.client])
            if(res.status!==201)toast.error(res.data.message)
            toast.success("Client Assigned Successfully")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const fetchAssignedClients = async()=>{
        try {
            const res = await API.get("/attorney/clients")
            setAssignedClients(res.data)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return(
        <AttorneyContext.Provider value={{handleAddClient,assignedClients,fetchAssignedClients,setAssignedClients}}>
            {children}
        </AttorneyContext.Provider>
    )
}