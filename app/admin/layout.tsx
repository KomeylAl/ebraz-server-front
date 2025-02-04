import { Metadata } from 'next';
import '../globals.css'
import Sidebar from '@/app/admin/_components/SideBar';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "کلینیک ابراز - پنل مدیریت",
  description: "کلینیک ابراز - پنل مدیریت",
};

export default function AdminLayout({
   children,
 }: Readonly<{
   children: React.ReactNode;
 }>) {
   return (
    <html dir='rtl' lang='fa'>
    <body className='admin-body relative'>
      <div className='h-full'>
        <div className='w-72 h-72 bg-amber-500 rounded-full -z-20 top-10 right-32 filter blur-3xl fixed' />
        <div className='w-72 h-72 bg-violet-500 rounded-full -z-20 top-48 right-48 filter blur-[100px] fixed' />
        <Toaster />
        <div className="bg-gray-200 bg-opacity-30 w-full h-screen min-h-fit">
          <div className='w-full h-full filter blur-2xl -z-10 fixed' />
          <Sidebar />
          <div className="px-4 lg:pr-96 lg:pl-12 pt-6 pb-6">{children}</div>
        </div>
      </div>
    </body>
    </html>
   );
 }