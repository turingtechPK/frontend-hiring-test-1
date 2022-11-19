export const convertUTCDateToLocalDate = (date) => {
  const time = date.split("T")[0].split("-");

  return `${time[2]}-${time[1]}-${time[0]}`;
};

export const getTotalTime = (data) => {
  const minutes = Math.floor(data / 60);
  const seconds = data % 60;

  return `${minutes} minutes ${seconds} seconds`;
};

export const setFirstLetterCapital = (data) => {
  const str2 = data.charAt(0).toUpperCase() + data.slice(1);
  return str2;
};
