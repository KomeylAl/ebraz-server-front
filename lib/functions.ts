export const getFormattedDate = () => {
   const today = new Date();
   const day = String(today.getDate()).padStart(2, "0"); // روز با پیشوند صفر
   const month = String(today.getMonth() + 1).padStart(2, "0"); // ماه با پیشوند صفر (ماه‌ها از 0 شروع می‌شوند)
   const year = today.getFullYear(); // سال

   return `${year}-${month}-${day}`;
};

export function dateConvert(app_date: string) {
   const date = new Date(app_date);
   const jalali_date = date.toLocaleDateString("fa-IR");
   return jalali_date;
 }