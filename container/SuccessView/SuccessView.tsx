import { Button } from "@mui/material"
import Link from "next/link"
import { FC } from "react"

import { SuccessViewProps } from "./SuccessView.interfaces"

export const SuccessView: FC<SuccessViewProps> = (props) => {
  const {
    actionButton = (
      <Link href="/" className="inline-block">
        <Button variant="contained">Go to Home</Button>
      </Link>
    ),
  } = props

  return (
    <section className="bg-white flex-grow flex items-center justify-center">
      <div className="text-center  space-y-8 p-6 pb-10 container max-w-2xl">
        <img className="h-80" src="/assets/done.svg" alt="Success" />
        <div className="text-4xl font-bold">Done!</div>
        <div className="text-sm">Successfully completed this process</div>
        {actionButton}
      </div>
    </section>
  )
}
