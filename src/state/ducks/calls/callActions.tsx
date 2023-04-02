import { setLoading, setCalls, setErrors, addNote, updateCalls } from "./callSlice";
import { getCalls, addNewNote, setArchiveCall } from "./callApi";
import { RECORDS_PER_PAGE } from "../../../utils/constants";
import { CallStateRaw } from "../../types";

export const fetchCalls = (page: number) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const offset = page * RECORDS_PER_PAGE;
    const response = await getCalls(offset, RECORDS_PER_PAGE);
    dispatch(setCalls(response.data));
  } catch (err: any) {
    dispatch(setErrors([err.message]));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createNote =
  (content: string, id: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const response = await addNewNote(content, id);
      if (response.data.id) {
        //confirm this
        dispatch(addNote());
      }
      throw new Error("Note not added!");
    } catch (err: any) {
      dispatch(setErrors([err.message]));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const archiveCall = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    await setArchiveCall(id);
    console.log("Call archived!");
  } catch (err: any) {
    dispatch(setErrors([err.message]));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateData=(data:CallStateRaw[])=>async (dispatch:any)=>{
  try{
    dispatch(setLoading(true));
    dispatch(updateCalls(data));
  }catch(err:any){
    dispatch(setErrors([err.message]));
  }finally{
    dispatch(setLoading(false));
  }
}
