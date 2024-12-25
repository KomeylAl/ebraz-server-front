"use client";

import AppsList from "@/app/admin/_components/AppsList";
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
  const [seven, setSeven] = useState([]);
  const [thirty, setThirty] = useState([]);
  const token = getCookie("token")?.toString();

  const [isTodaySending, setIsTodaySending] = useState(false);
  const [isTomorrowSending, setIsTomorrowSending] = useState(false);

  const lastSevenDaysClients = async (doctorId: string) => {
    setIsLoading(true);
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors/${doctorId}/panel/seven-days`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          setSeven(response.data);
        })
        .catch(function (error) {
          toast.error("خطا در دریافت اطلاعات");
          console.log(error);
        })
        .finally(() => setIsLoading(false));
  }

  const last30DaysClients = async (doctorId: string) => {
    setIsLoading(true);
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors/${doctorId}/panel/30-days`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          setThirty(response.data);
        })
        .catch(function (error) {
          toast.error("خطا در دریافت اطلاعات");
          console.log(error);
        })
        .finally(() => setIsLoading(false));
  }

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
    lastSevenDaysClients(params.doctorId);
    last30DaysClients(params.doctorId);
  }, [params.doctorId]);

  const sendTodaysSms = async (doctorId: any) => {
    setIsTodaySending(true);
    await axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors/${doctorId}/panel/today-sms`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          if (response.status === 200) {
            toast.success('پیامک با موفقیت ارسال شد');
          } else {
            toast.error('خطا در ارسال پیامک');
          }
          console.log(response.data)
        })
        .catch(function (error) {
          toast.error("خطا در ارسال پیامک");
          console.log(error);
        })
        .finally(() => setIsTodaySending(false));
  } 

  const sendTomorrowsSms = async (doctorId: any) => {
    setIsTomorrowSending(true);
    await axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors/${doctorId}/panel/tomorrow-sms`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          if (response.status === 200) {
            toast.success('پیامک با موفقیت ارسال شد');
          } else {
            toast.error('خطا در ارسال پیامک');
          }
          console.log(response.data)
        })
        .catch(function (error) {
          toast.error("خطا در ارسال پیامک");
          console.log(error);
        })
        .finally(() => setIsTomorrowSending(false));
  } 

  return (
   <div className='w-full h-full flex flex-col'>
      <Header pageTitle={doctor.name} />
      <div className="w-full flex flex-col gap-3 p-4">
        <div className="flex gap-3">
          <button 
            disabled={isTodaySending}
            onClick={() => sendTodaysSms(params.doctorId)}
            className="px-6 py-2 text-center bg-white bg-opacity-70 rounded-md cursor-pointer hover:bg-opacity-100 transition-all duration-300 disabled:cursor-not-allowed">
            {isTodaySending ? 'در حال ارسال...' : 'ارسال پیامک نوبت های امروز'}
          </button>
          <button 
            disabled={isTomorrowSending}
            onClick={() => sendTomorrowsSms(params.doctorId)}
            className="px-6 py-2 text-center bg-white bg-opacity-70 rounded-md cursor-pointer hover:bg-opacity-100 transition-all duration-300 disabled:cursor-not-allowed">
            {isTomorrowSending ? 'در حال ارسال...' : 'ارسال پیامک نوبت های فردا'}
          </button>
        </div>
        <div className="w-full bg-white bg-opacity-70 rounded-md p-4">
          <p className="text-lg font-bold">نوبت های هفت روز گذشته</p>
          <AppsList data={seven} isLoading={isLoading} />
        </div>
        <div className="w-full bg-white bg-opacity-70 rounded-md p-4">
          <p className="text-lg font-bold">نوبت های سی روز گذشته</p>
          <AppsList data={thirty} isLoading={isLoading} />
        </div>
      </div>
   </div>
  );
};

export default DoctorPanel;
