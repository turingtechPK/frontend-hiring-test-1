import React, { useContext, useEffect, useState } from "react";
import callService from "../services/call";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalLength, setTotalLength] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const handleData = async () => {
      try {
        const callData = await callService.getAll(user);

        console.log("Initial Table");
        console.table(callData.nodes);
        setData(callData);

        const totalPage = Math.ceil(callData.totalCount / 10);

        const newArr = Array(totalPage).fill(0);
        const numberArray = newArr.map((value, index) => {
          return (value = index + 1);
        });

        setTotalLength(numberArray);
      } catch (error) {
        console.log(error.response);
      }
    };

    handleData();
  }, [user]);

  useEffect(() => {
    const handlePageNumber = async () => {
      try {
        const callData = await callService.getCallsByPage(user, pageNumber, 10);
        console.log("Page Number Table");
        console.table(callData.nodes);
        setData(callData);
      } catch (error) {
        console.log(error.response);
      }
    };

    handlePageNumber();
  }, [user, pageNumber]);

  const nextPage = () => {
    setPageNumber((prevCount) => prevCount + 10);
  };

  const prevPage = () => {
    setPageNumber((prevCount) => prevCount - 10);
  };

  const handleClickPage = (event) => {
    setPageNumber((event.target.value - 1) * 10);
  };
  return (
    <>
      <h1>Data</h1>
      <p>{data && JSON.stringify(data.hasNextPage)}</p>
      <p>{data && JSON.stringify(data.nodes)}</p>
      <button onClick={nextPage}>Next</button>
      <button onClick={prevPage}>Prev</button>
      {data &&
        totalLength.map((value) => (
          <button onClick={handleClickPage} value={value}>
            {value}
          </button>
        ))}
    </>
  );
};

export default Dashboard;
