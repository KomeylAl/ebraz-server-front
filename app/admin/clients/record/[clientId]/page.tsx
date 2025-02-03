"use client";

import Header from "@/app/admin/_components/Header";
import WithRole from "@/app/admin/_components/WithRole";
import { dateConvert } from "@/lib/functions";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactSelect from "react-select";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import FileUploader from "@/app/admin/_components/FileUploader";

interface ClientRecordProps {
  params: {
    clientId: string;
  };
}

const ClientRecord = ({ params }: ClientRecordProps) => {
  const [selectedSuperVisor, setSelectedSuperVisor]: any = useState();
  const [selectedDoctor, setSelectedDoctor]: any = useState();
  const [selectedAdmin, setSelectedAdmin]: any = useState();
  const [record, setRecord]: any = useState({});
  const [client, setClient]: any = useState({});
  const [admins, setAdmins]: any = useState([]);
  const [doctors, setDoctors]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    doctor_id: 0,
    supervisor_id: 0,
    admin_id: 0,
    record_number: "",
    reference_source: "",
    admission_date: "",
    visit_date: "",
    chief_complaints: "",
    present_illness: "",
    past_history: "",
    family_history: "",
    personal_history: "",
    mse: "",
    diagnosis: "",
    companion_name: "",
    companion_phone: "",
    companion_address: "",
    images: []
  });

  const doctorsOptions: any = [];
  const superVisorsOptions: any = [];
  const adminsOptions: any = [];

  const getRecord = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/record/${params.clientId}`)
      .then(function (response) {
        if (response.status === 200) {
          setRecord(response.data);
        } else {
          toast.error("خطا در دریافت اطلاعات");
        }
      })
      .catch(function (error) {
        console.log("ERR_GET_CLIENT_RECORD", error);
        toast.error("خطا در دریافت اطلاعات");
      })
      .finally(() => setIsLoading(false));
  };

  const getClient = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/clients/${params.clientId}`)
      .then(function (response) {
        if (response.status === 200) {
          setClient(response.data);
        } else {
          toast.error("خطا در دریافت اطلاعات");
        }
      })
      .catch(function (error) {
        console.log("ERR_GET_CLIENT", error);
        toast.error("خطا در دریافت اطلاعات");
      })
      .finally(() => setIsLoading(false));
  };

  const getAdmins = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/admins/receptionists`)
      .then(function (response) {
        if (response.status === 200) {
          setAdmins(response.data);
        } else {
          toast.error("خطا در دریافت اطلاعات");
        }
      })
      .catch(function (error) {
        console.log("ERR_GET_ADMIN", error);
        toast.error("خطا در دریافت اطلاعات");
      })
      .finally(() => setIsLoading(false));
  };

  const getDoctors = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/doctors/`)
      .then(function (response) {
        if (response.status === 200) {
          setDoctors(response.data);
        } else {
          toast.error("خطا در دریافت اطلاعات");
        }
      })
      .catch(function (error) {
        console.log("ERR_GET_ADMIN", error);
        toast.error("خطا در دریافت اطلاعات");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getRecord();
    getClient();
    getAdmins();
    getDoctors();
  }, []);

  doctors.map((doctor: any) => {
    doctorsOptions.push({
      value: doctor.id,
      label: doctor.name,
    });
  });

  doctors.map((doctor: any) => {
    superVisorsOptions.push({
      value: doctor.id,
      label: doctor.name,
    });
  });

  admins.map((doctor: any) => {
    adminsOptions.push({
      value: doctor.id,
      label: doctor.name,
    });
  });

  const handleDoctorsChange = (selectedOption: any) => {
    setSelectedDoctor(selectedOption.value);
    setFormData((prev: any) => ({ ...prev, doctor_id: selectedOption.value }));
  };

  const handleSuperVisorsChange = (selectedOption: any) => {
    setSelectedSuperVisor(selectedOption.value);
    setFormData((prev: any) => ({ ...prev, supervisor_id: selectedOption.value }));
  };

  const handleAdminsChange = (selectedOption: any) => {
    setSelectedAdmin(selectedOption.value);
    setFormData((prev: any) => ({ ...prev, admin_id: selectedOption.value }));
  };

  const handleAdmissionDateChange = (value: any) => {
    const date = value.toDate().toISOString().slice(0, 19).replace('T', ' ').slice(0, 10);
    setFormData((prev: any) => ({ ...prev, admission_date: date }));
  };
  
  const handleVisitDateChange = (value: any) => {
    const date = value.toDate().toISOString().slice(0, 19).replace('T', ' ').slice(0, 10);
    setFormData((prev: any) => ({ ...prev, visit_date: date }));
  };

  const handleFilesSelected = (files: File[]) => {
    setUploadedImages(files);
    setFormData((prev: any) => ({ ...prev, images: files }))
  };
  
  const handleSubmit = async () => {

    // let ima: any = [];

    // uploadedImages.forEach((file: any, index: any) => {
    //   ima.push(`images[${index}]`, file)
    // })
    // setFormData((prev: any) => ({ ...prev, images: ima }))

    await axios.post(`/api/record/store/${params.clientId}`, formData)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log("ERR_STORE_RECORD", error)
      })
  }

  return (
    <WithRole allowedRoles={["boss", "manager"]}>
      <div className="w-full h-full flex flex-col">
        <Header pageTitle="پرونده پزشکی" />
        <div className="w-full h-full p-8">
          <h2>ویرایش پرونده پزشکی</h2>
          <div className="w-full mt-5 flex items-start justify-between gap-5">
            <div className="w-[70%] h-full flex flex-col items-center gap-5">
              <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>مشخصات مراجع</h3>
                <div className="w-full mt-4 flex items-center justify-between gap-3">
                  <input
                    type="text"
                    className="w-full bg-white rounded-sm p-2 hover:cursor-not-allowed"
                    disabled
                    value={client.name}
                  />
                  <input
                    type="text"
                    className="w-full bg-white rounded-sm p-2 hover:cursor-not-allowed"
                    disabled
                    value={client.phone}
                  />
                  <input
                    type="text"
                    className="w-full bg-white rounded-sm p-2 hover:cursor-not-allowed"
                    disabled
                    value={dateConvert(client.birth_date)}
                  />
                </div>
                <p className="mt-4 text-sm">
                  برای ویرایش مشخصات مراجع به صفحه{" "}
                  <span className="text-blue-500">
                    <Link href={`/admin/clients/edit/${client.id}`}>
                      ویرایش
                    </Link>
                  </span>{" "}
                  بروید.
                </p>
              </div>
              <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>مشخصات همراه</h3>
                <div className="w-full mt-4 flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={formData.companion_name}
                    onChange={(e: any) => setFormData((prev: any) => ({ ...prev, companion_name: e.target.value }))}
                    className="w-full bg-white rounded-sm p-2"
                    placeholder="نام و نام خانوادگی*"
                    required
                  />
                  <input
                    type="text"
                    value={formData.companion_phone}
                    onChange={(e: any) => setFormData((prev: any) => ({ ...prev, companion_phone: e.target.value }))}
                    className="w-full bg-white rounded-sm p-2"
                    placeholder="شماره تلفن*"
                    required
                  />
                  <input
                    type="text"
                    value={formData.companion_address}
                    onChange={(e: any) => setFormData((prev: any) => ({ ...prev, companion_address: e.target.value }))}
                    className="w-full bg-white rounded-sm p-2"
                    placeholder="آدرس"
                  />
                </div>
              </div>
              <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>اطلاعات اصلی پرونده</h3>
                <div className="w-full mt-4 flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={formData.record_number}
                    onChange={(e: any) => setFormData((prev: any) => ({ ...prev, record_number: e.target.value }))}
                    className="w-full bg-white rounded-sm p-2"
                    placeholder="شماره پرونده*"
                    required
                  />
                  <input
                    type="text"
                    value={formData.reference_source}
                    onChange={(e: any) => setFormData((prev: any) => ({ ...prev, reference_source: e.target.value }))}
                    className="w-full bg-white rounded-sm p-2"
                    placeholder="منبع ارجاع"
                    required
                  />
                  <ReactSelect
                    className="w-full rounded-sm p-2"
                    placeholder="روانشناس*"
                    options={doctorsOptions}
                    onChange={handleDoctorsChange}
                    required
                  />
                  <ReactSelect
                    className="w-full rounded-sm p-2"
                    placeholder="سوپروایزر*"
                    options={superVisorsOptions}
                    onChange={handleSuperVisorsChange}
                    required
                  />
                </div>
              </div>
              <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>طلاعات پذیرش</h3>
                <div className="w-full mt-4 flex items-center justify-between gap-3">
                  <ReactSelect
                    className="w-full rounded-sm p-2"
                    placeholder="پذیرش کننده*"
                    options={adminsOptions}
                    onChange={handleAdminsChange}
                    required
                  />
                  <DatePicker
                    calendarPosition="bottom-right"
                    inputClass="w-full bg-white p-2 rounded-sm"
                    containerClassName="w-full"
                    placeholder="تاریخ مراجعه*"
                    onChange={handleAdmissionDateChange}
                    calendar={persian}
                    locale={fa}
                    format="YYYY-MM-DD"
                  />
                  <DatePicker
                    calendarPosition="bottom-right"
                    inputClass="w-full bg-white p-2 rounded-sm"
                    containerClassName="w-full"
                    placeholder="تاریخ ویزیت*"
                    onChange={handleVisitDateChange}
                    calendar={persian}
                    locale={fa}
                    format="YYYY-MM-DD"
                  />
                </div>
              </div>

              <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>Chief Complaints</h3>
                <textarea
                  value={formData.chief_complaints}
                  onChange={(e: any) => setFormData((prev: any) => ({ ...prev, chief_complaints: e.target.value }))}
                  className="w-full bg-white p-2 rounded-sm mt-4"
                  rows={5}
                />
              </div>
              <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>Present Ilness</h3>
                <textarea
                  value={formData.present_illness}
                  onChange={(e: any) => setFormData((prev: any) => ({ ...prev, present_illness: e.target.value }))}
                  className="w-full bg-white p-2 rounded-sm mt-4"
                  rows={5}
                />
              </div>
              <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>Past History</h3>
                <textarea
                  value={formData.past_history}
                  onChange={(e: any) => setFormData((prev: any) => ({ ...prev, past_history: e.target.value }))}
                  className="w-full bg-white p-2 rounded-sm mt-4"
                  rows={5}
                />
              </div>
              <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>Family History</h3>
                <textarea
                  value={formData.family_history}
                  onChange={(e: any) => setFormData((prev: any) => ({ ...prev, family_history: e.target.value }))}
                  className="w-full bg-white p-2 rounded-sm mt-4"
                  rows={5}
                />
              </div>
              <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>Personal History</h3>
                <textarea
                  value={formData.personal_history}
                  onChange={(e: any) => setFormData((prev: any) => ({ ...prev, personal_history: e.target.value }))}
                  className="w-full bg-white p-2 rounded-sm mt-4"
                  rows={5}
                />
              </div>
              <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>MSE</h3>
                <textarea
                  value={formData.mse}
                  onChange={(e: any) => setFormData((prev: any) => ({ ...prev, mse: e.target.value }))}
                  className="w-full bg-white p-2 rounded-sm mt-4"
                  rows={5}
                />
              </div>
              <div className="w-full bg-white/45 rounded-sm p-4">
                <h3>Diagnosis</h3>
                <textarea
                  value={formData.diagnosis}
                  onChange={(e: any) => setFormData((prev: any) => ({ ...prev, diagnosis: e.target.value }))}
                  className="w-full bg-white p-2 rounded-sm mt-4"
                  rows={5}
                />
              </div>
            </div>
            <div className="w-[30%] bg-white/45 rounded-sm p-4">
              <h3>ویرایش پرونده</h3>
              <div className="w-full flex items-center gap-4 mt-4">
                <button onClick={handleSubmit} className="w-full bg-blue-500 text-center text-white p-2 rounded-sm">
                  ویرایش
                </button>
                <Link
                  href="/admin/clients"
                  className="w-full border border-blue-500 text-center p-2 rounded-sm"
                >
                  لغو تغییرات
                </Link>
              </div>
              <div className="mt-8">
              <h3>تصاویر پرونده</h3>
              <FileUploader 
                images={record.images || []}
                onFilesSelected={handleFilesSelected}
                allowMultiple
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithRole>
  );
};

export default ClientRecord;
