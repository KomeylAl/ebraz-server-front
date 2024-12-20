"use client";

import Header from "@/app/admin/_components/Header";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface DoctorPanelProps {
  params: {
    doctorId: string;
  };
}

const DoctorPanel = ({ params }: DoctorPanelProps) => {
  const [doctor, setDoctor]: any = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const token = getCookie("token")?.toString();

  useEffect(() => {
    const getDoctor = async (doctorId: string) => {
      setIsLoading(true);
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors/${doctorId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          setDoctor(response.data[0]);
        })
        .catch(function (error) {
          toast.error("خطا در دریافت اطلاعات مشاور");
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    };

    getDoctor(params.doctorId);
  }, [params.doctorId]);

  return (
   <div className='w-full h-full flex flex-col'>
      <Header pageTitle='پنل مشاور' />
   </div>
  );
};

export default DoctorPanel;
