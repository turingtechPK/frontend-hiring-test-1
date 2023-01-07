export const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let sec = time - minutes * 60;
  return `${minutes} minutes ${sec} seconds`;
};

export const formatDate = (date) => {
  let day = date.substring(8, 10);
  let month = date.substring(5, 7);
  let year = date.substring(0, 4);
  return `${day}-${month}-${year}`;
};
