import {useEffect} from "react";
import {useRouter} from "next/router";
import Header from "@/components/Header";
import HomePage from "@/components/HomePage";

export default function Home() {
  return (
    <>
      <Header loginPage={false}/>
        <HomePage />
    </>
  )
}
