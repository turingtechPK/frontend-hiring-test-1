export function convertSecondsToMinutesAndSeconds(seconds) {
  if (typeof seconds !== 'number' || seconds < 0) {
    return 'Invalid input';
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes} minutes and ${remainingSeconds} seconds`;
}

export function capitalizeFirstLetter(str) {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
}