import axios from "axios"
import toast from "react-hot-toast";

export const getInvoices = async (token: string, loading: boolean) => {
   let invoices: any = [];
   axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/invoices`, {
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
   }).then(function (response) {
      if (response.status === 200) {
         invoices = response.data;
      } else {
         toast.error('خطا در دریافت فاکتور ها');
      }
   }).catch()
}