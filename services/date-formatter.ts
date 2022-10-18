import Moment from "moment";
export const formatDuration = (date: string) => {
  let minutes = Moment(date).format("m");
  let seconds = Moment(date).format("s");
  return minutes + " minutes " + seconds + " seconds";
};

export const formatDate = (date: string) => {
  return Moment(date).format("DD-MM-YY");
};
