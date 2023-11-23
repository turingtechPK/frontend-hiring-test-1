import { getLocalStorage } from "@root/utils/local-storage";
import type { SignInPayloadProps } from "./types";
import * as Yup from "yup";

const data: any = getLocalStorage("rememberMe");

export const signInInitialValue: SignInPayloadProps = {
  username: data?.username || "",
  password: data?.password || "",
  loggedIn: data?.loggedIn || false,
};
export const signInFormSchema: any = Yup.object().shape({
  username: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required").min(2).max(15),
});
