import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

import { paths } from "@root/paths";
import { useSelector } from "@store";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard(props: AuthGuardProps): JSX.Element | null {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const [checked, setChecked] = useState<boolean>(false);

  const check = useCallback(() => {
    if (!isAuthenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();
      const href = `${paths.auth.login}?${searchParams}`;
      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, router]);

  // Only check on mount, this allows us to redirect the user manually when auth state changes
  useEffect(() => {
    check();
  }, [check]);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
}
