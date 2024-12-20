"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { MdDelete, MdEditSquare } from "react-icons/md";

export const AdminsList = () => {
  const [admins, setAdmins]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const token = getCookie("token")?.toString();

  const getAdmins = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/admins`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.code);

      if (response.status === 401) {
        console.log("hhdiuhf");
        router.push("/login");
      }

      if (response.status == 200) {
        setAdmins(response.data);
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
    getAdmins();
  }, []);

  const handleDelete = async (adminId: any) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/admins/${adminId}`);
    } catch (error: any) {
      console.log(error.toString());
    }
    getAdmins();
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
      <div
        className="flex items-center 
           justify-between py-4 border-b 
           border-gray-200 md:gap-0 p-4"
      >
        <div className="hidden md:block w-1/6 text-right font-bold">#</div>
        <div className="w-1/6 text-right font-bold">نام</div>
        <div className="hidden md:block w-1/6 text-right font-bold">تلفن</div>
        <div className="w-1/6 text-right font-bold">سِمت</div>
        <div className="w-1/6 text-center font-bold">ویرایش</div>
        <div className="w-1/6 text-center font-bold">حذف</div>
      </div>
      <div
        className=""
      >
        {admins.map((admin: any) => (
          <div
            key={admin.id}
            className="flex items-center md:justify-between py-4 md:gap-0 p-4 bg-white rounded-md shadow-md mt-3"
          >
            <div className="hidden md:block w-1/6 text-right">{admin.id}</div>
            <div className="w-1/6 text-right">{admin.name}</div>
            <div className="hidden md:block w-1/6 text-right">{admin.phone}</div>
            <div className="w-1/6 text-right">{admin.role}</div>
            <div className="w-1/6">
              <Link
                className="flex items-center justify-center" 
                href={`/admin/admins/edit/${admin.id}`}>
                <MdEditSquare 
                  size={25}
                  className="text-amber-500 cursor-pointer"
                />
              </Link>
            </div>
            <div className="w-1/6 flex justify-center items-center">
              <MdDelete 
                size={25}
                className="text-rose-500 cursor-pointer"
                onClick={() => handleDelete(admins.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
