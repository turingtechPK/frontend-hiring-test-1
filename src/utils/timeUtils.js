import isEmpty from "lodash/isEmpty";
import jwtDecode from "jwt-decode";

export const isTokenValid = (token, timeRemainingSecs) => {
  if (isEmpty(token)) {
    return false;
  }
  const tokenVals = jwtDecode(token);
  const { exp } = tokenVals;
  const rn = Date.now() / 1000;
  const allowedTimeDiff = timeRemainingSecs || 60;

  return exp - rn > allowedTimeDiff;
};
