import Moment from "moment";

export const getDuration = (date) => {
  let minutes = Moment(date).format("m");
  let seconds = Moment(date).format("s");
  return minutes !== '0' ? `${minutes} minutes ${seconds} seconds` : `${seconds} seconds`;
};

export const getDate = (date) => {
  return Moment(date).format("DD-MM-YY");
};
