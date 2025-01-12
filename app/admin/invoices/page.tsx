"use client";

import React, { useEffect, useState } from "react";
import Header from "../_components/Header";
import axios from "axios";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import InvoiceItem from "../_components/InvoiceItem";
import Link from "next/link";

const Invoices = () => {
  const token = getCookie("token")?.toString();
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInvoices = async () => {
    setIsLoading(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/invoices`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          setInvoices(response.data);
        } else {
          toast.error("خطا در دریافت فاکتور ها");
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error("خطا در دریافت فاکتور ها");
      })
      .finally(() => setIsLoading(false));
  };
  
  useEffect(() => {
    fetchInvoices();
  }, [])
  
  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col">
      <Header pageTitle="فاکتور ها" />
      <div className="flex items-center justify-center w-full h-full">
        <BeatLoader 
          className="text-center mt-20 flex items-center justify-center"
          color={"#3fb2f2"}
          size={30}
        />
      </div>
    </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="فاکتور ها" />
      <div className="w-full h-full p-4">
        <Link
          href={"/admin/invoices/add"}
          className="px-12 py-2 bg-cyan-600 rounded-md text-white text-center cursor-pointer"
        >
          صدور فاکتور
        </Link>
        <div className="flex items-center justify-between border-b border-gray-200 py-6 mt-9">
          <p className="font-semibold w-[20%] text-center">#</p>
          <p className="font-semibold w-[20%] text-center">مراجع</p>
          <p className="font-semibold w-[20%] text-center">از تاریخ</p>
          <p className="font-semibold w-[20%] text-center">تا تاریخ</p>
          <p className="font-semibold w-[20%] text-center">دانلود</p>
        </div>
      </div>
      <div className="w-full h-full p-4">
        {invoices.map((invoice: any) => (
          <InvoiceItem 
            key={invoice.id}
            data={invoice}
          />
        ))}
      </div>
    </div>
  );
};

export default Invoices;
