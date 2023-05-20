import { Call } from "@/lib/types";
import { Paper, Text } from "@mantine/core";

function secondsToHms(d: number) {
  var h = Math.floor(d / 3600);
  var m = Math.floor(d / 60);
  var s = Math.floor((d % 3600) % 60);

  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return (
    <>
      {mDisplay}
      {sDisplay} <br /> <Text color="blue">({d} seconds)</Text>
    </>
  );
}

const FormatDate = (ISOdate: string) => {
  let date = new Date(ISOdate);
  let formattedDate =
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2) +
    "-" +
    date.getFullYear();
  return formattedDate;
};

const CallType = (call_type: string) => {
  if (call_type === "missed") {
    return <Text color="red">Missed</Text>;
  } else if (call_type === "answered") {
    return <Text color="green">Answered</Text>;
  } else {
    return <Text color="blue">Voicemail</Text>;
  }
};


export { secondsToHms, FormatDate, CallType };
