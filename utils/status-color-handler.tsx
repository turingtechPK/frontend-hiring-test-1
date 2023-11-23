"use client";

type Variants = "archived" | "unArchived";

export function statusColorHandler(variant: Variants): any {
  switch (variant) {
    case "archived":
      return { bgcolor: "#D1FADF", color: "#05603A" };
    case "unArchived":
      return { bgcolor: "#FFF4DE", color: "#FFB016" };
    default:
      return { bgcolor: "#EBE9FE", color: "#4A1FB8" };
  }
}
