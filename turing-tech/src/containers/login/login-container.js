import React from "react";
import { FormProvider } from "../../providers";
import { useForm } from "react-hook-form";
import { LoginForm } from "./login-form";

export const LoginContainer = () => {
  const methods = useForm({
    defaultValues: { username: null, password: null },
    mode: "all",
  });

  return (
    <FormProvider {...methods}>
      <LoginForm />
    </FormProvider>
  );
};
