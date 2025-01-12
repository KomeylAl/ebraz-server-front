"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "../../_components/Header";
import { BeatLoader } from "react-spinners";
import ReactSelect from "react-select";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import { useRouter } from "next/navigation";

const AddInvoice = () => {
  const [clients, setClients] = useState([]);
  const [admin, setAdmin]: any = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const token = getCookie("token")?.toString();
  const clientsOptions: any = [];
  const [selectedClient, setSelectedClient]: any = useState();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setTodate] = useState("");

  const router = useRouter();

  const fetchData = async () => {
    setIsLoading(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/clients`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          setClients(response.data);
        } else {
          toast.error("خطا در دریافت اطلاعات");
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error("خطا در دریافت اطلاعات");
      })
      .finally(() => setIsLoading(false));
  };

  const fetchAdmin = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/user-info`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          setAdmin(response.data);
        } else {
          toast.error("خطا در دریافت اطلاعات");
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error("خطا در دریافت اطلاعات");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
    fetchAdmin();
  }, []);

  clients.map((doctor: any) => {
    clientsOptions.push({
      value: doctor.id,
      label: doctor.name,
    });
  });

  const handleClientsChange = (selectedOption: any) => {
    setSelectedClient(selectedOption.value);
  };

  const handleFromDateChange = (value: any) => {
    setFromDate(
      value.toDate().toISOString().slice(0, 19).replace("T", " ").slice(0, 10)
    );
  };

  const handleToDateChange = (value: any) => {
    setTodate(
      value.toDate().toISOString().slice(0, 19).replace("T", " ").slice(0, 10)
    );
  };

  const handleSubmit = async () => {
    setSendLoading(true);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/invoices/add`,
        {
          client: selectedClient,
          from_date: fromDate,
          to_date: toDate,
          admin: admin.id,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        if (response.status === 201) {
          toast.success("فاکتور با موفقیت صادر شد");
          router.push("/admin/invoices");
        } else {
          toast.error("خطا در صدور فاکتور");
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error("خطا در صدور فاکتور");
      })
      .finally(() => setSendLoading(false));
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col">
        <Header pageTitle="صدور فاکتور" />
        <div className="flex items-center justify-center w-full h-full">
          <BeatLoader
            className="text-center mt-20 flex items-center justify-center"
            color={"#3fb2f2"}
            size={30}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="فاکتور ها" />
      <div className="w-full h-full flex items-center justify-between gap-3 p-4">
        <div className="w-full">
          <label>انتخاب مراجع</label>
          <ReactSelect
            className="mt-3 focus:ring-black focus:border-black"
            placeholder="انتخاب مراجع"
            defaultInputValue={selectedClient}
            onChange={handleClientsChange}
            options={clientsOptions}
          />
        </div>
        <div className="w-full">
          <label>از تاریح</label>
          <div className="w-full">
            <DatePicker
              calendarPosition="bottom-right"
              inputClass="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
              containerClassName="w-full"
              onChange={handleFromDateChange}
              calendar={persian}
              locale={fa}
              format="YYYY-MM-DD"
            />
          </div>
        </div>
        <div className="w-full">
          <label>تا تاریخ</label>
          <div className="w-full">
            <DatePicker
              calendarPosition="bottom-right"
              inputClass="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
              containerClassName="w-full"
              onChange={handleToDateChange}
              calendar={persian}
              locale={fa}
              format="YYYY-MM-DD"
            />
          </div>
        </div>
        <div className="w-full">
          <div
            onClick={handleSubmit}
            className={`
                mt-9 w-52 cursor-pointer text-center rounded-md py-2 text-white
                ${sendLoading ? "bg-blue-400" : "bg-blue-700"}
            `}
          >
            افزودن فاکتور
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInvoice;
