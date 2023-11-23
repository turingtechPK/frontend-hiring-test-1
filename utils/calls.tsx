type Variants = "archived" | "unArchived";

export function getVariant(status: boolean): Variants {
  if (status) {
    return "archived";
  } else {
    return "unArchived";
  }
}

export function getCallTypeColor(callType: string): string {
  switch (callType) {
    case "missed":
      return "error.main";
    case "answered":
      return "success.main";
    default:
      return "primary.main";
  }
}

export function getFormattedDuration(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;

  return `${minutes}-Minutes ${seconds}-Seconds`;
}
