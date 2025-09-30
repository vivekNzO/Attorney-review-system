import { createContext } from "react";
import API from "../utils/axios";
import toast from "react-hot-toast";

export const AttorneyContext = createContext()

export const AttorneyProvider = ({children})=>{

    const handleAddClient = async(clientEmail)=>{
        console.log(clientEmail)
        try {
            const res = await API.post("/attorney/add-client",{clientEmail})
            if(res.status!==201)toast.error(res.data.message)
            toast.success("Client Assigned Successfully")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return(
        <AttorneyContext.Provider value={{handleAddClient}}>
            {children}
        </AttorneyContext.Provider>
    )
}