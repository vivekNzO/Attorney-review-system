import React from "react";
import { AuthProvider } from "./AuthContext";
import { AdminContext, AdminProvider } from "./AdminContext";

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <AdminProvider>{children}</AdminProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
