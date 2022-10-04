import axios from "axios";
import AppConstants from "../../constants/AppConstants";

export const SIGNIN = "SIGNIN";
export const SIGNOUT = "SIGNOUT";

export const signIn = (email, password) => {
	console.log("Mein chala")
  return async (dispatch) => {
	const response = await axios.post(`${AppConstants.baseURL}`, { email, password })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

    if (!response.ok) {
      const errorResData = await response.json();
      throw new Error(errorResData.msg[0].msg);
    }

  };
};

export const signout = () => {
  return { type: SIGNOUT };
};
