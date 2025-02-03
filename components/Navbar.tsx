'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { MdMenu } from 'react-icons/md';

const items = [
   {
      title: 'خانه',
      link: '/'
   },
   {
      title: 'دریافت نوبت',
      link: '/appointment'
   },
   {
      title: 'دپارتمان ها',
      link: '/departments'
   },
   {
      title: 'مشاوران',
      link: '/psychologists'
   },
   {
      title: 'درباره مرکز ابراز',
      link: '/about'
   },
];

const Navbar = () => {

   const pathname = usePathname();
   const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='md:hidden'>
         <MdMenu 
            className='text-white'
            size={30}
         />
      </button>
      <div className={`w-54 h-fit bg-white p-8 rounded-lg shadow-lg absolute transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} transition-all duration-300 ease-in-out`}>
         <nav>
            <ul className='flex flex-col items-start gap-6'>
               {items.map((item: any) => (
                  <li 
                  className={`${pathname === item.link ? 'text-sky-500' : ''} font-semibold hover:text-sky-500 transition-all duration-200`}
                  key={item.link}>
                     <Link href={item.link}>{item.title}</Link>
                  </li>
               ))}
            </ul>
         </nav>
      </div>
      <nav>
         <ul className={`w-full hidden md:flex items-center gap-8 text-white`}>
            {items.map((item: any) => (
               <li 
                  className={`${pathname === item.link ? 'text-sky-500' : ''} font-semibold text-lg hover:text-sky-500 transition-all duration-200`}
                  key={item.link}>
                     <Link href={item.link}>{item.title}</Link>
                  </li>
            ))}
         </ul>
      </nav>
    </div>
  )
}

export default Navbar