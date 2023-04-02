export default function formatDuration(durationInSeconds: number) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes} mins ${seconds} secs`;
}

export function extractDateFromString(str: string): string {
    const year = parseInt(str.substr(0, 4));
    const month = parseInt(str.substr(5, 2)) - 1;
    const day = parseInt(str.substr(8, 2));
    return `${day}-${month}-${year}`;
  }

  export function toSentenceCase(str:string) {
    if (typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }