"use client";

import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import axios from "axios";
import ReactSelect from "react-select";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Header from "@/app/admin/_components/Header";
import { dateConvert } from "@/lib/functions";
import { PulseLoader } from "react-spinners";

interface EditAdminProps {
  params: {
    adminId: string;
  };
}

const EditAdmin = ({ params }: EditAdminProps) => {
  const [admin, setAdmin]: any = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "",
    birth_date: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const router = useRouter();

  const rolesOptions = [
    { value: "receptionist", label: "پذیرش" },
    { value: "manager", label: "مدیریت" },
    { value: "author", label: "نویسنده وب سایت" },
    { value: "accountant", label: "حسابداری" },
  ];

  const handleRolesChange = (selectedOption: any) => {};

  const fetchAdmin = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/admins/${params.adminId}`)
      .then(function (response) {
        setAdmin(response.data);
        setFormData({
          name: response.data.name,
          phone: response.data.phone,
          role: response.data.role,
          birth_date: response.data.birth_date,
          password: "",
        });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("خطا در دریافت اطلاعات کاربر");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  const handleBirthDateChange = (value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      birth_date: value
        .toDate()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")
        .slice(0, 10),
    }));
  };

  const handleSubmit = async (e: any) => {
    setIsSending(true);
    await axios
      .post(
        `/api/admins/${admin.id}/edit`,
        formData
      )
      .then(function (response) {
        if (response.status === 200) {
          toast.success("اطلاعات با موفقیت بروز رسانی شد");
          // router.push("/admin/admins");
          console.log(response.data);
        } else {
          toast.error("خطا در بروز رسانی اطلاعات");
        }
      })
      .catch(function (error) {
        console.log(error);
        toast("خطا در برقراری ارتباط با سرور");
      })
      .finally(() => setIsSending(false));
  };

  if (!admin) {
    return <div>در حال دریافت اطلاعات</div>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="ویرایش اطلاعات ادمین" />
      <div className="w-full h-full flex flex-col p-8 mt-6 rounded-sm">
        <div className="w-full flex gap-3 mt-9 ">
          <div className="w-full">
            <label>نام و نام خانوادگی</label>
            <input
              value={formData.name}
              onChange={(e) => {
                setFormData((prev: any) => ({ ...prev, name: e.target.value }));
              }}
              type="text"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>سِمت</label>
            <ReactSelect
              className="mt-2 bg-amber-400"
              placeholder="انتخاب سمت"
              onChange={handleRolesChange}
              options={rolesOptions}
            />
          </div>
        </div>
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>شماره تلفن</label>
            <input
              value={formData.phone}
              onChange={(e) => {
                setFormData((prev: any) => ({
                  ...prev,
                  phone: e.target.value,
                }));
              }}
              type="number"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>تاریخ تولد</label>
            <div className="w-full">
              <DatePicker
                value={dateConvert(formData.birth_date)}
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
          <div className="w-full">
          <label>رمز عبور</label>
            <input
              onChange={(e) => {
                setFormData((prev: any) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
              type="text"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className={`
           mt-9 w-52 cursor-pointer text-center rounded-md p-2 text-white
           ${isSending ? "bg-blue-400" : "bg-blue-600"}`}
        >
          {isSending ? (
            <PulseLoader size={8} color="#ffffff" />
          ) : (
            "ویرایش اطلاعات"
          )}
        </button>
      </div>
    </div>
  );
};

export default EditAdmin;
