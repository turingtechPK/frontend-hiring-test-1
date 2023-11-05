import * as React from "react";
import { FormProvider as RHFFormProvider } from "react-hook-form";

export const FormProvider = ({ children, ...methods }) => {
  return <RHFFormProvider {...methods}>{children}</RHFFormProvider>;
};
