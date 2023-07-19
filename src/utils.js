//Util functions

//Used to convert seconds to minutes & seconds
export const convertToMinutes = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  let result = "";

  if (minutes > 0) {
    result += minutes === 1 ? "1 minute" : `${minutes} minutes`;
  }

  if (seconds > 0) {
    if (result.length > 0) {
      result += " ";
    }

    result += seconds === 1 ? "1 second" : `${seconds} seconds`;
  }

  return result;
};

//Used to format the date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDay()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}-${month}-${year}`;
};

//Group data by date

export const groupData = (data) => {
  const groupedData = data.reduce((result, item) => {
    const date = item.created_at; // Replace "date" with your actual date field name
    if (!result[date]) {
      result[date] = [];
    }
    result[date].push(item);
    return result;
  }, {});

  return groupedData;
};

//Finding the number of pages from taking ceiling value of the total pages and total items displayed at a time

export const findTotalPages = (total) => {
  return Math.ceil(total / 9);
};

//Capitalize first letters of the string

export const capitalizeFirstLetters = (str) => {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }

  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
