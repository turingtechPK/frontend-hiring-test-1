import axios from "axios";
import { config } from "../../config";

// const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const BASE_URL = config.BACKEND_BASE_URL;
console.log("BASE URL:", BASE_URL)
export const getCalls = (page = 0, pageSize = 10) => async (dispatch) => {

  try {
    console.log("Call Request initiated")
    dispatch({
      type: "GET_CALLS_REQUEST"
    });

    const token = localStorage.getItem("access_token");
    const offset = page * pageSize;
    const { data } = await axios.get(`${BASE_URL}/calls?offset=${offset}&limit=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Call Object:", data);

    dispatch({
      type: "GET_CALLS_SUCCESS",
      payload: data,
    });
    console.log("Success user dispatched")


  } catch (error) {
    console.log("Fetch User Error:", error.response.data)
    dispatch({
      type: "GET_CALLS_FAIL",
      payload: error.response.data.message,
    });
  }
}
export const getCallWithID = (id) => async (dispatch) => {

  try {
    console.log("Call ID Request initiated")
    dispatch({
      type: "GET_CALL_WITH_ID_REQUEST"
    });

    const token = localStorage.getItem("access_token");
    const { data } = await axios.get(`${BASE_URL}/calls/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Call ID Object:", data);

    dispatch({
      type: "GET_CALL_WITH_ID_SUCCESS",
      payload: data,
    });
    console.log("Success call id dispatched")


  } catch (error) {
    console.log("Fetch User Error:", error.response.data)
    dispatch({
      type: "GET_CALL_WITH_ID_FAIL",
      payload: error.response.data.message,
    });
  }
}


export const updateNotes = (id, payload) => async (dispatch) => {

  try {
    console.log("update note Request initiated")
    dispatch({
      type: "UPDATE_CALL_NOTES_REQUEST"
    });

    const token = localStorage.getItem("access_token");
    const { data } = await axios.post(`${BASE_URL}/calls/${id}/note`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Update note Object:", data);

    dispatch({
      type: "UPDATE_CALL_NOTES_SUCCESS",
      payload: data,
    });
    console.log("Update note successfully dispatched")


  } catch (error) {
    console.log("Error updating notes:", error.response.data)
    dispatch({
      type: "UPDATE_CALL_NOTES_FAIL",
      payload: error.response.data.message,
    });
  }
}

export const updateCallStatus = (id, isArchived) => async (dispatch) => {
  try {
    console.log("update note Request initiated")
    dispatch({
      type: "UPDATE_CALL_STATUS_REQUEST"
    });
    const token = localStorage.getItem("access_token");
    const { data } = await axios.put(
      `${BASE_URL}/calls/${id}/archive`,
      { is_archived: isArchived },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log("Update call status Object:", data);

    dispatch({
      type: "UPDATE_CALL_STATUS_SUCCESS",
      payload: data,
    });


  } catch (error) {
    console.error("Error updating call status:", error.response.data);
    dispatch({
      type: "UPDATE_CALL_STATUS_FAIL",
      payload: error.response.data.message,
    });
  }
};
