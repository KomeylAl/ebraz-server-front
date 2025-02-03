"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { MdDelete, MdEditSquare } from "react-icons/md";
import Link from "next/link";
import ConfirmDialog from "@/utils/ui/CustomDialog";
import { IoDocument } from "react-icons/io5";

export const ClientsList = () => {
  const [clients, setClients]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterdClients, setFilterdClients] = useState([]);

  const router = useRouter();
  const token = getCookie("token")?.toString();

  const handleSearch = (event: any) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filterd = clients.filter(
      (client: any) => client.name.includes(term) || client.phone.includes(term)
    );

    setFilterdClients(filterd);
  };

  useEffect(() => {
    setIsLoading(true);
    const getClients = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/clients`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          router.push("/login");
        }

        if (response.status == 200) {
          setClients(response.data);
          setFilterdClients(response.data);
        } else {
          console.log(response.data);
        }
      } catch (e: any) {
        console.log(e.toString());
      } finally {
        setIsLoading(false);
      }
    };
    getClients();
  }, [router, token]);

  const handleDelete = async (clientId: any) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/clients/${clientId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error: any) {
      console.log(error.toString());
    }
    router.refresh();
  };

  function dateConvert(birthDate: string) {
    const date = new Date(birthDate);
    const jalali_date = date.toLocaleDateString("fa-IR");
    return jalali_date;
  }

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
    <>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-xl">مراجعان</h2>
          -
          <input
            type="text"
            placeholder="جستجو"
            className="px-4 py-2 rounded-md bg-transparent border border-gray-100"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div
          onClick={() => router.push("/admin/clients/add")}
          className="px-12 py-2 bg-cyan-600 rounded-md text-white text-center cursor-pointer"
        >
          افزودن مراجع
        </div>
      </div>
      <div className="w-full flex flex-col mt-6">
        <div
          className="flex items-center p-4
            md:justify-between py-4 border-b 
            border-gray-200 gap-28
            md:overflow-x-hidden
            md:gap-0"
        >
          <div className="w-[5%] text-right text-sm md:font-bold">#</div>
          <div className="w-[15%] text-right text-sm md:font-bold">
            نام و نام خانوادگی
          </div>
          <div className="w-[15%] text-right text-sm md:font-bold">
            شماره تلفن
          </div>
          <div className="w-[15%] text-right text-sm md:font-bold">
            تاریخ تولد
          </div>
          <div className="w-[15%] text-center text-sm md:font-bold">پرونده پزشکی</div>
          <div className="w-[15%] text-center text-sm md:font-bold">ویرایش</div>
        </div>
        <div className="md:overflow-x-hidden">
          {filterdClients.map((client: any, index: any) => (
            <div
              key={client.id}
              className="flex items-center md:justify-between py-4 gap-28 md:gap-0 p-4 bg-white rounded-md shadow-md mt-3"
            >
              <div className="w-[5%] text-right">{index + 1}</div>
              <div className="w-[15%] text-right">{client.name}</div>
              <div className="w-[15%] text-right">{client.phone}</div>
              <div className="w-[15%] text-right">
                {dateConvert(client.birth_date)}
              </div>
              <div className="w-[15%]">
                <Link
                  className="flex items-center justify-center"
                  href={`/admin/clients/record/${client.id}`}
                >
                  <IoDocument
                    size={25}
                    className="text-blue-500 cursor-pointer"
                  />
                </Link>
              </div>
              <div className="w-[15%]">
                <Link
                  className="flex items-center justify-center"
                  href={`/admin/clients/edit/${client.id}`}
                >
                  <MdEditSquare
                    size={25}
                    className="text-amber-500 cursor-pointer"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
