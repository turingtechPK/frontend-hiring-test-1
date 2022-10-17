import { Button } from "@mui/material"
import Link from "next/link"
import React from "react"

import { NotFoundProps } from "./NotFound.interfaces"

export const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <section className="bg-white flex-grow flex items-center justify-center">
      <div className="text-center  space-y-8 p-6 pb-10 container max-w-2xl">
        <img className="h-80" src="/assets/notfound.svg" alt="NotFound" />
        <div className="text-4xl font-bold">Not Found!</div>
        <div className="text-sm">Page Not Found!</div>
        <Link href="/" className="inline-block">
          <Button variant="contained">Back Home</Button>
        </Link>
      </div>
    </section>
  )
}
