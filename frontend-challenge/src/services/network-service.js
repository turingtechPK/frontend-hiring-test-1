import axios from "axios"
const TIMEOUT = 90 * 1000

const getHeaders = (token) => {
  return {
    Authorization: `bearer ${token}`,
  };
};

export const performGetRequest = (url, token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { headers: getHeaders(token) })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject("Not Authorized")
        if (error.response?.status === 401) {
          //   removeAppCookies()
          typeof window !== "undefined" ? window.location.reload() : null;
          return;
        }
        const responseError =
          error.response && error.response.data
            ? error.response.data
            : { error: error.message };
        reject(responseError);
      });
  });
};

export const performPostRequest = (url, data, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        ...(token ? { headers: getHeaders(token) } : {}),
        timeout: TIMEOUT,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const performPutRequest = (url, data, token) => {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data, {
        headers: getHeaders(token),
        timeout: TIMEOUT,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        const responseError =
          error.response && error.response.data
            ? error.response.data
            : { error: error.message };
        reject(responseError);
      });
  });
};
