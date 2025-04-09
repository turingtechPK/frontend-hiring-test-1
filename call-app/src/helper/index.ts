import { Call } from "@/types";

export const getCallTypeColor = (callType: string) => {
  switch (callType.toLowerCase()) {
    case "answered":
      return "green";
    case "missed":
      return "red";
    case "voicemail":
      return "#5071EA";
    default:
      return "black";
  }
};

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} m ${remainingSeconds} s`;
};

export const groupCallsByDate = (calls: Call[]) => {
  const grouped: Record<string, Call[]> = {};

  calls.forEach((call) => {
    const dateStr = new Date(call.created_at).toLocaleDateString();
    if (!grouped[dateStr]) {
      grouped[dateStr] = [];
    }
    grouped[dateStr].push(call);
  });

  // Sort dates in descending order (newest first)
  return Object.entries(grouped).sort((a, b) => {
    return new Date(b[0]).getTime() - new Date(a[0]).getTime();
  });
};
