import { getUserData } from "@/actions/admin-actions";
import Navbar from "@/app/admin/_components/Navbar";
import { cookies } from "next/headers";

export default async function Sidebar() {

    const cookie = cookies();
    const token = cookie.get('token');
    const user = await getUserData(token?.value)

    return (
        <div className="h-screen fixed p-6 rounded-sm">
            <div className='hidden h-full w-80 lg:flex flex-col items-center justify-between bg-white/45 border border-white p-8 backdrop-blur-2xl'>
                <h1 className='text-2xl font-bold text-right'>کلینیک ابراز</h1>
                <Navbar user={user} />
            <p className=''>
                ebraz-admin
            </p>
        </div>
        </div>
    )
}