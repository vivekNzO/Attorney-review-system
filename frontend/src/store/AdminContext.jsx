import { createContext, useState } from "react";
import API from "../utils/axios";
import toast from "react-hot-toast";

export const AdminContext = createContext()

export const AdminProvider = ({children})=>{
    
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)

    const fetchPendingAttorneyRequests = async()=>{
        setLoading(true)
        try {
            const res = await API.get("/admin/approvals")
            setData(res.data)
            return res.data
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }finally{
            setLoading(false)
        }
    }

    const handleAttorneyApproval = async(userId)=>{
        try {
            console.log(userId)
            await API.patch(`/admin/approvals/${userId}/approve`)
            setData(data.filter((item)=>item.id!==userId))
            toast.success("Attorney Request Approved")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    const handleAttorneyRejection = async(userId)=>{
        try {
            console.log(userId)
            await API.patch(`/admin/approvals/${userId}/reject`)
            setData(data.filter((item)=>item.id!==userId))
            toast.success("Attorney Request Rejected")
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }


    return(
        <AdminContext.Provider value={{data,setData,loading,fetchPendingAttorneyRequests,handleAttorneyApproval,handleAttorneyRejection}}>
        {children}
        </AdminContext.Provider>
    )
}