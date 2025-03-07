"use client";

import Header from "@/app/admin/_components/Header";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [medicalNumber, setMedicalNumber] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState('');

  const [errors, setErrors] : any = useState();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const token = getCookie('token')?.toString();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors/add`,
        {
          'name': name,
          'phone': phone,
          'card_number': cardNumber,
          'birth_date': birthDate,
          'national_code' : nationalCode,
          'medical_number' : medicalNumber,
          'email' : email
        }, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response.data)
      if (response.status === 201) {
        toast.success('مشاور با موفقیت افزوده شد')
        router.push('/admin/doctors')
      }
    } catch (error: any) {
      console.log(error, "DOCOR_ADD_ERROR");
      toast.error('خطا در افزودن مشاور')
      setErrors(error.response.data.errors)
      console.log(error)
      setIsLoading(false)
    }
  }

  const renderErrors = (field: any) =>
    errors?.[field]?.map((error: any, index: any) => (
      <div key={index} className="text-red-600">
        {error}
      </div>
  ));

  const handleBirthDateChange = (value: any) => {
    console.log(value.toDate().toISOString().slice(0, 19).replace('T', ' ').slice(0, 10))
    setBirthDate(value.toDate().toISOString().slice(0, 19).replace('T', ' ').slice(0, 10))
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="افزودن مشاور" />
      <div className="w-full h-full p-8 flex flex-col">
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>نام و نام خانوادگی</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>کد ملی</label>
            <input
              onChange={(e) => setNationalCode(e.target.value)}
              type="number"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
        </div>
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>شماره تلفن</label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>تاریخ تولد</label>
            <div className="w-full">
              <DatePicker
                calendarPosition="bottom-right"
                inputClass="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
                containerClassName="w-full"
                onChange={handleBirthDateChange}
                calendar={persian}
                locale={fa}
                format="YYYY-MM-DD"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>شماره نظام روانشناسی</label>
            <input
              onChange={(e) => setMedicalNumber(e.target.value)}
              type="number"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>ایمیل</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
        </div>
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>شماره کارت</label>
            <input
              onChange={(e) => setCardNumber(e.target.value)}
              type="number"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>تصویر پروفایل</label>
            <input
              type="file"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
        </div>
        <div
          onClick={handleSubmit}
          className={`
                mt-9 w-52 cursor-pointer text-center rounded-md py-2 text-white
                ${isLoading ? "bg-blue-400" : "bg-blue-700"}
            `}
        >
          افزودن مشاور
        </div>
        <div className="mt-9 text-red-600">
          <p>{renderErrors("name")}</p>
          <p>{renderErrors("national_code")}</p>
          <p>{renderErrors("medical_number")}</p>
          <p>{renderErrors("card_number")}</p>
          <p>{renderErrors("email")}</p>
          <p>{renderErrors("phone")}</p>
          <p>{renderErrors("birth_date")}</p>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;