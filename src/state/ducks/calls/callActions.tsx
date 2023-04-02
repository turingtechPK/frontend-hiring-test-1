import { setLoading, setCalls, setErrors, addNote } from "./callSlice";
import { getCalls, addNewNote } from "./callApi";

export const fetchCalls =
  (offset: Number, limit: Number) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const response = await getCalls(offset, limit);
      dispatch(setCalls(response.data));
    } catch (err: any) {
      dispatch(setErrors([err.message]));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const createNote =
  (content: String, id: String) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const response = await addNewNote(content, id);
      if (response.data.id) {
        //confirm this
        dispatch(addNote());
        console.log("Note added!");
      }
      throw new Error("Note not added!");
    } catch (err: any) {
      dispatch(setErrors([err.message]));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const archiveCall = (id: String) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    archiveCall(id);
    console.log("Call archived!");
  } catch (err: any) {
    dispatch(setErrors([err.message]));
  } finally {
    dispatch(setLoading(false));
  }
};
