'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";
import { getCookie } from "cookies-next";
import { getFormattedDate } from "@/lib/functions";

const ToDaysList = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const date = new DateObject({
    calendar: persian,
    locale: persian_fa,
    format: "YYYY-MM-DD",
  }).toString();

  const router = useRouter();
  const token = getCookie('token');

  useEffect(() => {

    const getAppointments = async (date: any) => {
      setIsLoading(true);
      const today = getFormattedDate();
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/appointments/date/${today}`, {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token}`
            },
          }
        );
        setAppointments(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getAppointments(date);
  }, [date, token]);

  if (isLoading) {
    return (
      <div>
        <BeatLoader
          className="text-center mt-20 flex items-center justify-center"
          color={"#3fb2f2"}
          size={30}
        />
      </div>
    );
  }

  return (
      <div className="w-full flex flex-col md:max-h-[650px] max-h-[450px] h-fit pr-6 pl-2 mt-6">
        <div className="
            flex items-center 
            justify-between p-4 border-b 
            border-gray-200
          ">
          <div className="w-[5%] text-right font-bold">#</div>
          <div className="w-[15%] text-right font-bold">مراجع</div>
          <div className="w-[15%] text-right font-bold">مشاور</div>
          <div className="w-[15%] text-right font-bold">تاریخ و ساعت</div>
          <div className="w-[15%] text-right font-bold">وضعیت</div>
          <div className="w-[15%] text-right font-bold">پرداخت</div>
        </div>
        <div className="">
          {appointments.map((appointment: any) => (
            <div
              key={appointment.referral_id}
              onClick={() =>
                router.push(`/admin/appointments/edit/${appointment.referral_id}`)
              }
              className="flex items-center justify-between md:gap-0 p-4 bg-white rounded-md mt-3 shadow-md hover:bg-gray-100 cursor-pointer border border-cyan-400"
            >
              <div className="w-[5%] text-right">{appointment.referral_id}</div>
              <div className="w-[15%] text-right">{appointment.client}</div>
              <div className="w-[15%] text-right">{appointment.doctor}</div>
              <div className="w-[15%] text-right">
                {appointment.time} - {appointment.date}
              </div>
              <div className={`w-[15%] text-right ${appointment.status === "pending" ? "text-rose-500" : "text-green-500"}`}>
                {appointment.status === "pending" ? "انجام نشده" : "انجام شده"}
              </div>
              <div className={`w-[15%] text-lg text-right ${appointment.payment_status === 'unpaid' ? "text-amber-500" : "text-sky-600"}`}>
                  {appointment.payment}
               </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default ToDaysList;
