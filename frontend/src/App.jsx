import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AttorneySignup from "./pages/AttorneySignup";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthContext } from "./store/AuthContext";
import Loading from "./Skeletons/Loading";
import WaitForApproval from "./pages/WaitForApproval";
import PendingRequests from "./pages/PendingRequests";
import ViewClients from "./pages/ViewClients";
import ClientProfile from "./pages/ClientProfile";

function App() {
  const { authUser, loading } = useContext(AuthContext);

  console.log(authUser);

  if(!authUser && loading){
    
    return <Loading/>
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup"  element={!authUser?<Signup/> : <Navigate to={"/"}/>} />
        <Route path="/login" element={!authUser?<Login/> : <Navigate to={"/"}/>} />
        <Route path="/attorney-signup" element={!authUser?<AttorneySignup/> : <Navigate to={"/"}/>} />
        <Route path="/" element=<HomePage/> />
        {/* <Route path="/admin" element={authUser?.role==='Admin'?<AdminDashboard/>:<Navigate to={"/"}/>} /> */}
        <Route path="/wait-for-approval" element=<WaitForApproval/>/>
        <Route path="/pending-requests" element={authUser?.role==='Admin'?<PendingRequests/> : <Navigate to={"/"}/>}/>
        <Route path="/browse-clients" element=<ViewClients/> />
        <Route path="/client-profile/:id" element={authUser?<ClientProfile/> : <Navigate to={"/"}/>}/>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
