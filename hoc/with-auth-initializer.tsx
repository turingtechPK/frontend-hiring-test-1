import type { ReactNode } from "react";

import { SplashScreen } from "@components";
import { TurningLogo } from "@assets";
import { useAuthMeQuery } from "@services/auth-api";
import { useDispatch, useSelector } from "@store";
import { authActions } from "@slices";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthInitializer(props: AuthProviderProps): JSX.Element {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const { refreshToken }: any = useSelector(
    (state: { auth: any }) => state.auth
  );

  const { isLoading, isError } = useAuthMeQuery({}, { skip: !refreshToken });
  const { children } = props;
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <SplashScreen>
        <Image src={TurningLogo} alt="" width={matches ? 230 : 450} />
      </SplashScreen>
    );
  }

  if (isError) {
    return dispatch(authActions.logout());
  }

  return <>{children}</>;
}
