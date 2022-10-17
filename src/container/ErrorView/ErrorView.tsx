import { Button } from "@mui/material"
import { FC } from "react"

import { ErrorViewProps } from "./ErrorView.interfaces"

export const ErrorView: FC<ErrorViewProps> = (props) => {
  const {
    title = "Oh no!",
    description = `Something went wrong, try reloading this page.`,
    actionButton = (
      <Button onClick={() => window.location.reload()} variant="contained">
        Try Again
      </Button>
    ),
  } = props

  return (
    <section className="bg-white flex-grow flex items-center justify-center">
      <div className="text-center  space-y-8 p-6 pb-10 container max-w-2xl">
        <img className="h-80" src="/assets/error.svg" alt="Error" />
        <div className="text-4xl font-bold">{title}</div>
        <div className="md:text-lg xl:text-xl">{description}</div>
        {actionButton}
      </div>
    </section>
  )
}
