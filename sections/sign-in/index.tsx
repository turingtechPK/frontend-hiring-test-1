import React from "react";

import { Box, Stack, Theme } from "@mui/material";
import { useForm } from "react-hook-form";
import type { SignInPayloadProps } from "./types";
import { signInInitialValue, signInFormSchema } from "./schema";
import { useRouter, useSearchParams } from "next/navigation";
import { EmailIcon, TurningLogo, PasswordIcon } from "@assets";
import { RHFTextField, FormProvider, RHFCheckbox } from "@components";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { setLocalStorage, removeLocalStorage } from "@utils";
import { useLoginMutation } from "@services/auth-api";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";

export function SignInSection(): JSX.Element {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const [mutation, { isLoading }] = useLoginMutation();

  const method = useForm<SignInPayloadProps>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: signInInitialValue,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSubmit } = method;

  async function formSubmitHandler(payload: SignInPayloadProps): Promise<any> {
    const { username, password, loggedIn } = payload;
    loggedIn
      ? setLocalStorage("rememberMe", { username, password, loggedIn })
      : removeLocalStorage("rememberMe");
    try {
      const { message } = await mutation({ username, password }).unwrap();
      toast.success(message || "Sign In Successfully!");
      router.push(returnTo || "/calls");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something Went Wrong!");
    }
  }

  return (
    <Stack spacing={5} sx={{ width: "100%", maxWidth: 550 }}>
      <Box sx={{ textAlign: "center" }}>
        <Image src={TurningLogo} alt="" width={matches ? 230 : 450} />
      </Box>
      <FormProvider methods={method} onSubmit={handleSubmit(formSubmitHandler)}>
        <Stack spacing={3} direction="column">
          <RHFTextField
            type="text"
            outerLabel="Email"
            fullWidth
            name="username"
            placeholder="Enter Username Here"
            StartIcon={<EmailIcon sx={{ color: "neutral.500", mr: 1 }} />}
          />
          <RHFTextField
            type="password"
            fullWidth
            outerLabel="Password"
            name="password"
            placeholder="Enter password here"
            StartIcon={<PasswordIcon sx={{ color: "neutral.500", mr: 1 }} />}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <RHFCheckbox name="loggedIn" label="Remember me" />
          </Box>
          <LoadingButton
            fullWidth
            variant="contained"
            type="submit"
            sx={{ borderRadius: "8px" }}
            loading={isLoading}
          >
            Login
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
