

function secondsToHms(d) {
  var h = Math.floor(d / 3600);
  var m = Math.floor(d / 60);
  var s = Math.floor((d % 3600) % 60);

  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return (
    <>
      {mDisplay}
      {sDisplay} <br /> <p style={{color: "blue"}} >({d} seconds)</p>
    </>
  );
}

const FormatDate = (ISOdate) => {
  let date = new Date(ISOdate);
  let formattedDate =
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2) +
    "-" +
    date.getFullYear();
  return formattedDate;
};

const CallType = (call_type) => {
  if (call_type === "missed") {
    return <span style={{color:"red"}} >Missed</span>;
  } else if (call_type === "answered") {
    return <span style={{color:"green"}}>Answered</span>;
  } else {
    return <span style={{color:"blue"}}>Voicemail</span>;
  }
};


export { secondsToHms, FormatDate, CallType };
