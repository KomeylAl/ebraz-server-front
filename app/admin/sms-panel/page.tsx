'use client'

import React, { useState } from "react";
import Header from "../_components/Header";

const SmsPanel = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="پنل پیامک" />
      <div className="flex flex-col lg:flex-row gap-6 p-8">
        <div className="flex flex-col items-start gap-3 w-full lg:w-[40%]">
          <p className="font-semibold">ارسال پیامک تکی</p>
          <div className="w-full flex flex-col">
            <label htmlFor="message">پیام</label>
            <textarea
              name="message"
              id=""
              className="mt-3 bg-white p-2 rounded-md w-full shadow-md"
            />
            <input type="number" className="mt-3 bg-white rounded-md w-full p-2 shadow-md" placeholder="شماره تلفن" />
            <button className="px-12 py-2 bg-cyan-600 rounded-md mt-3 w-72
               text-white text-center cursor-pointer">ارسال پیامک</button>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 w-full lg:w-[40%]">
          <p className="font-semibold">ارسال پیامک گروهی</p>
          <div className="w-full flex flex-col">
            <label htmlFor="message">پیام</label>
            <textarea
              name="message"
              id=""
              className="mt-3 bg-white p-2 rounded-md w-full shadow-md"
            />
            <label className="mt-3" htmlFor="phone_numbers">شمار های تلفن</label>
            <textarea name="phone_numbers" className="mt-3 bg-white rounded-md w-full p-2 shadow-md" placeholder="شماره ها را با Enter از یکدیگر جدا کنید" />
            <button className="px-12 py-2 bg-cyan-600 rounded-md mt-3 w-72
               text-white text-center cursor-pointer">ارسال پیامک</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmsPanel;
