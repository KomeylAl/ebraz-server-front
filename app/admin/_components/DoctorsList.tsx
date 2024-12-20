"use client";

import ConfirmDialog from "@/utils/ui/CustomDialog";
import axios from "axios";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDelete, MdEditSquare, MdInsertChart } from "react-icons/md";
import { BeatLoader } from "react-spinners";

export const DoctorsList = () => {
  const [doctors, setDoctors]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isDeleting, setDeleting] = useState<boolean>(false);

  const router = useRouter();
  const token = getCookie("token")?.toString();

  const getDoctors = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        setDoctors(response.data);
      } else {
        console.log(response.data);
      }
    } catch (e: any) {
      console.log(e.toString());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getDoctors();
  }, []);

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  const handleDelete = async (doctorId: any) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors/${doctorId}`);
    } catch (error: any) {
      console.log(error.toString());
    }
    getDoctors();
  };

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
    <div className="w-full flex flex-col mt-6">
      <div className="flex items-center justify-between py-4 border-b border-gray-200 gap-28 p-4 md:gap-0">
        <div className="w-[5%] text-right font-bold">#</div>
        <div className="w-[15%] text-right font-bold">نام و نام خانوادگی</div>
        <div className="w-[15%] text-right font-bold">شاره تلفن</div>
        <div className="w-[15%] text-center font-bold">پنل مشاور</div>
        <div className="w-[15%] text-center font-bold">ویرایش</div>
        <div className="w-[15%] text-center font-bold">حذف</div>
      </div>
      <div className="">
        {doctors.map((doctor: any) => (
          <div
            key={doctor.id}
            className="flex items-center justify-between py-4 gap-28 md:gap-0 bg-white p-4 mt-3 rounded-md shadow-md"
          >
            <div className="w-[5%] text-right">{doctor.id}</div>
            <div className="w-[15%] text-right">{doctor.name}</div>
            <div className="w-[15%] text-right">{doctor.phone}</div>
            <div className="w-[15%]">
              <Link 
                href={`/admin/doctors/panel/${doctor.id}`} 
                className="flex items-center justify-center">
                <MdInsertChart 
                  size={25}
                  className="text-blue-500 cursor-pointer"
                />
              </Link>
            </div>
            <div className="w-[15%]">
              <Link
                className="flex items-center justify-center" 
                href={`/admin/doctors/edit/${doctor.id}`}>
                <MdEditSquare 
                  size={25}
                  className="text-amber-500 cursor-pointer"
                />
              </Link>
            </div>
            <div className="w-[15%] flex justify-center items-center">
              <MdDelete 
                size={25}
                className="text-rose-500 cursor-pointer"
                onClick={handleDeleteClick}
              />
            </div>
          </div>
        ))}
      </div>
      <ConfirmDialog 
        isLoading={isDeleting}
        onCancel={() => setDialogOpen(false)}
        onConfirm={() => handleDelete}
        open={isDialogOpen}
      />
    </div>
  );
};
