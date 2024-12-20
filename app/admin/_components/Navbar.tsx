"use client";

import { MdClass, MdDashboard, MdPayment } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiList } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { IoPerson } from "react-icons/io5";
import { BiEnvelope } from "react-icons/bi";

interface NavbarProps {
  user: any
}

const Navbar = ({ user }: NavbarProps) => {
  const links = [
    {
      title: "داشبورد",
      link: "/admin",
      access: "admin",
      icon: <MdDashboard />,
    },
    {
      title: "نوبت ها",
      link: "/admin/appointments",
      access: "admin",
      icon: <SlCalender />,
    },
    {
      title: "مراجعان",
      link: "/admin/clients",
      access: "admin",
      icon: <FiList />,
    },
    {
      title: "مشاورین",
      link: "/admin/doctors",
      access: "admin",
      icon: <IoPerson />,
    },
    {
      title: "پرداخت ها",
      link: "/admin/payments",
      access: "admin",
      icon: <MdPayment />,
    },
    {
      title: "کلاس ها و کارگاه ها",
      link: "/admin/classes",
      access: "admin",
      icon: <MdClass />,
    },
    {
      title: "مدیران سایت",
      link: "/admin/admins",
      access: "boss",
      icon: <FiList />,
    },
    {
      title: "پنل پیامک",
      link: "/admin/sms-panel",
      access: "admin",
      icon: <BiEnvelope />,
    },
  ];

  const pathName = usePathname();

  if (!user) {
    return (
      <div>
        احراز هویت انجام نشد دوباره تلاش کنید
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {links.map((link) => {
        if (user.role === "boss") {
          return (
            <Link
              key={link.link}
              href={link.link}
              className={`text-white flex items-center 
                            gap-2 text-lg w-full px-4 py-2
                            ${
                              pathName === link.link
                                ? "bg-cyan-900 rounded-md"
                                : "bg-transparent"
                            }
                            `}
            >
              {link.icon} {link.title}
            </Link>
          );
        } else {
          return link.access === "admin" ? (
            <Link
            key={link.link}
              href={link.link}
              className={`text-white flex items-center 
                            gap-2 text-lg w-full px-4 py-2
                            ${
                              pathName === link.link
                                ? "bg-cyan-900 rounded-md"
                                : "bg-transparent"
                            }
                            `}
            >
              {link.icon} {link.title}
            </Link>
          ) : (
            <div key='key'></div>
          );
        }
      })}
    </div>
  );
};

export default Navbar;
