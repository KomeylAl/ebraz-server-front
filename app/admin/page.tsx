"use client";

import Link from "next/link";
import { ClientsList } from "./_components/ClientsList";
import Header from "./_components/Header";
import { Tab, Tabs } from "./_components/Tabs";
import ToDaysList from "./_components/TodaysList";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminHome() {

  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="داشبورد" />
      <div className="w-full flex flex-col p-8">
        <div className="w-full h-full flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">نوبت های امروز</h2>
            <div className="px-12 py-2 bg-cyan-600 rounded-md text-white text-center cursor-pointer">
              <Link href={'/admin/appointments/add'}>
              افزودن نوبت
              </Link>
            </div>
          </div>
          <div className="mt-12"> 
            <Tabs>
              <Tab label="نوبت های امروز" defaultTab>
                <div className="py-4">
                  <ToDaysList />
                </div>
              </Tab>
              <Tab label="مراجعان" defaultTab={false}>
                <div className="py-4">
                  <ClientsList />
                </div>
              </Tab>
            </Tabs>
          </div>
          {/* <Tabs dir="rtl">
            <TabsList defaultValue='today' dir="rtl">
              <TabsTrigger value="today">نوبت های امروز</TabsTrigger>
              <TabsTrigger value="clients">مراجعان</TabsTrigger>
            </TabsList>
            <TabsContent value="today"><ToDaysList /></TabsContent>
            <TabsContent value="clients"><ClientsList /></TabsContent>
          </Tabs> */}
        </div>
      </div>
    </div>
  );
}
