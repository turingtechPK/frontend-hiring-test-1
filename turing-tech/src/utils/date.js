import { format } from "date-fns";

export const formatDate = (inputDateStr) => {
  const inputDate = new Date(inputDateStr);
  return format(inputDate, "dd-MM-yyyy");
};
