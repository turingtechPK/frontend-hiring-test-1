import React, { useContext, useEffect, useState } from "react";
import callService from "../services/call";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const handleData = async () => {
      try {
        const callData = await callService.getAll(user);
        console.log(callData);
        setData(callData);
      } catch (error) {
        console.log(error.response);
      }
    };

    handleData();
  }, [user]);
  return <div>Dashboard</div>;
};

export default Dashboard;
