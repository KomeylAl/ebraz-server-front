'use client';

import ClassesList from '@/app/admin/_components/ClassesList';
import Header from '@/app/admin/_components/Header'
import { Tab, Tabs } from '@/app/admin/_components/Tabs'
import React from 'react'
import WorkShopsList from '../_components/WorkShopsList';

const Classes = () => {
  return (
   <div className="w-full h-full flex flex-col">
   <Header pageTitle="کلاس ها و کارگاه ها" />
   <div className="w-full flex flex-col p-8">
     <div className="w-full h-full flex flex-col p-4">

         <Tabs>
           <Tab label="کلاس ها">
             <div className="py-4">
               <ClassesList />
             </div>
           </Tab>
           <Tab label="کارگاه ها">
             <div className="py-4">
               <WorkShopsList />
             </div>
           </Tab>
         </Tabs>
     </div>
   </div>
 </div>
  )
}

export default Classes