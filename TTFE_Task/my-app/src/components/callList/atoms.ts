import { atom, RecoilState } from "recoil";

export const noteText: RecoilState<any> = atom({
  key: "noteText",
  default: "",
});
