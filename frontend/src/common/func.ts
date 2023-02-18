import moment from "moment";
import "moment-duration-format";

export const capitalize = (s: string = "") =>
  s.slice(0, 1).toUpperCase() + s.slice(1);

export const getTableTextColor = (text: string = "") => {
  switch (text) {
    case "voicemail":
      return "primary";
    case "missed":
      return "error";
    case "answered":
      return "green";

    default:
      break;
  }
};

export const secondsToTimeStr = (seconds: number = 0): string => {
  if (seconds === 0) return "";

  const formatTemplate =
    seconds > 3600 ? "mm [minutes] ss [seconds]" : "ss [seconds]";

  return moment.duration(seconds, "seconds").format(formatTemplate);
};
