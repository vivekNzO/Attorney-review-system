import React from "react";
import { AuthProvider } from "./AuthContext";
import { AdminContext, AdminProvider } from "./AdminContext";
import { AttorneyProvider } from "./AttorneyContext";

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <AdminProvider>
        <AttorneyProvider>{children}</AttorneyProvider>
      </AdminProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
