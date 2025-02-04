"use client";

import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { PuffLoader } from "react-spinners";

interface WithRoleProps {
  allowedRoles: Array<String>;
  children: React.ReactNode;
}

const WithRole = ({ allowedRoles, children }: WithRoleProps) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = getCookie("role");
    setRole(userRole ? String(userRole) : null);
  }, []);

  if (!role) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <PuffLoader 
          className="text-center mt-20 flex items-center justify-center"
          color={"#3fb2f2"}
          size={80}
        />
      </div>
    );
  }

  if (!allowedRoles.includes(role!)) {
    return (
      <div className="w-full h-full flex flex-col">
        <Header pageTitle="داشبورد" />
        <div className="w-full h-full flex items-center justify-center p-10">
          شما به این قسمت دسترسی ندرید.
        </div>
      </div>
    );
  }

  return children;
};

export default WithRole;
