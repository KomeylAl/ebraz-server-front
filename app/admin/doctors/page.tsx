'use client'


import { DoctorsList } from "@/app/admin/_components/DoctorsList";
import Header from "@/app/admin/_components/Header";
import {useRouter} from "next/navigation";


const Doctors = () => {
    const router = useRouter()
    return (
        <div className='w-full h-full flex flex-col'>
            <Header pageTitle='مشاورین'/>
            <div className='w-full flex flex-col p-8'>
                <div className='w-full h-full flex flex-col'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-bold text-xl'>مشاورین</h2>
                        <div
                            onClick={() => router.push('/admin/doctors/add')}
                            className='px-12 py-2 bg-cyan-600 rounded-md text-white text-center cursor-pointer'>
                            افزودن مشاور
                        </div>
                    </div>
                    <DoctorsList />
                </div>
            </div>
        </div>
    )
}

export default Doctors