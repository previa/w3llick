export const getAirDateToString = (date: Date, currentDate: Date): string => {
  if (date.toString() === "Invalid Date") {
    return "-";
  }

  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const month =
    date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;

  return day + "/" + month + "/" + date.getFullYear();
};
