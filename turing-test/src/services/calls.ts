import { CallList } from "@/shared/types";
import BaseAPI from "./base-api";

export const CALLS_ROUTES = {
  calls: "/calls",
};

export namespace callsService {
  export const getCalls = (url: string) => {
    return BaseAPI.get<CallList>(url);
  };

  export const getCall = (url: string) => {
    return BaseAPI.get(url);
  };

  export const addNote = (id: string, content: string) => {
    return BaseAPI.post(`${CALLS_ROUTES.calls}/${id}/note`, { content });
  };
}
