import { REQUEST_METHODS } from "../constants/appUtilsConstants";
import qs from "qs";
import transform from "lodash/transform";
import snakeCase from "lodash/snakeCase";
import trim from "lodash/trim";
import pickBy from "lodash/pickBy";
import identity from "lodash/identity";

export const baseApi = (apiUri, headers, method, body = null) =>
  fetch(apiUri, {
    method,
    headers,
    ...(method === REQUEST_METHODS.POST && { body: JSON.stringify(body) }),
  }).then((response) => response.json());

const cleanUpQueryKeys = (queryObject) =>
  transform(pickBy(queryObject, identity), (resultObject, value, key) => {
    const newKey = snakeCase(trim(key));
    resultObject[newKey] = value;
  });

export const getPageParams = (pageSettings) => {
  const cleanPageSettings = {
    offset: pageSettings.page,
    limit: pageSettings.perPage,
  };
  return qs.stringify(cleanUpQueryKeys(cleanPageSettings));
};
