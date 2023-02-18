import { useEffect } from "react";
import axios from "axios";
import { api_url_base } from "../common/const";
import { useDispatch, useSelector } from "react-redux";
import { updateCalls } from "../redux/slices/calls.slice";

export const useFetchCalls = (offset: number = 0) => {
  const dispatch = useDispatch();
  const access_token = useSelector((state: any) => state.auth.accessToken);

  useEffect(() => {
    const fetchCalls = async () => {
      const config = {
        headers: { Authorization: `Bearer ${access_token}` },
      };

      try {
        const response = await axios.get(
          `${api_url_base}/calls?offset=${offset}`,
          config
        );

        dispatch(updateCalls(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchCalls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);
};
