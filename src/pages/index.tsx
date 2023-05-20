import { Title, Text } from "@mantine/core";
import { useContext } from "react";
import { PaginatedCallsList } from "@/components";
import { useState, useEffect } from "react";
import Router from "next/router";

export default function Home() {

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token)
      Router.push("/login");
  }, []);


  return (
    <>
      <Title order={1}>Turing Technologies Frontend Test</Title>
      <PaginatedCallsList />
    </>
  );
}
