import type { Ref } from "react";
import { forwardRef } from "react";
import type { LinkProps } from "next/link";
import Link from "next/link";

/**
 * This is a wrapper over `next/link` component.
 * We use this to help us maintain consistency between Vite and Next.js
 */
export const RouterLink = forwardRef(function RouterLink(
  props: LinkProps,
  ref: Ref<HTMLAnchorElement>
) {
  return <Link ref={ref} {...props} />;
});
