export const PAGE_TITLES = {
  login: "Login",
  dashboard: "Call List",
};

export const CALL_LIST_TABLE_HEADERS = {
  callType: { id: "call_type", label: "call type" },
  direction: { id: "direction", label: "direction" },
  duration: { id: "duration", label: "duration" },
  from: { id: "from", label: "from" },
  to: { id: "to", label: "to" },
  via: { id: "via", label: "via" },
  createdAt: { id: "created_at", label: "created at" },
  status: { id: "status", label: "status" },
  actions: { id: "actions", label: "actions" },
};

export const REQUEST_METHODS = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const REQ_STATUSES = {
  idle: "idle",
  loading: "loading",
  succeeded: "succeeded",
  failed: "failed",
};

export const FILTER_INITIAL_STATE = {
  status: "",
};

export const PAGE_SETTINGS = {
  page: 1,
  perPage: 5,
};

export const DATE_FORMAT = "dd-MM-yyyy";
