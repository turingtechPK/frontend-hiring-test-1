import { useState, useEffect } from "react";
import axios from "./api";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";

export interface Call {
  id: string;
  direction: String;
  from: String;
  to: String;
  duration: number;
  is_archived: Boolean;
  call_type: String;
  via: String;
  created_at: String;
  notes: [];
}

function useFetch(offset: number) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [callData, setCallData] = useState<Call[]>([]);
  const [filteredData, setFilteredData] = useState<Call[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`/calls?offset=${offset}&limit=10`, {
          headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
        })
        .then((res: any) => {
          setCallData(res.data.nodes);
          setFilteredData(res.data.nodes);
          setTotalCount(res.data.totalCount);
          setHasNextPage(res.data.hasNextPage);
        })
        .catch((err: any) => {
          setError(err);
          if (err.response.data.statusCode === 401) {
            logout();
          }
        })
        .finally(() => setIsLoading(false));
    };

    fetchData();
  }, [offset]);

  return {
    isLoading,
    error,
    callData,
    filteredData,
    totalCount,
    hasNextPage,
    setCallData,
    setFilteredData,
  };
}

export default useFetch;
