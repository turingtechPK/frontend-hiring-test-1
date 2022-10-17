import { FC } from "react"

import { COMPONENT_PROPS } from "./COMPONENT_NAME.interface"

export const COMPONENT_NAME: FC<COMPONENT_PROPS> = (props) => {
  const { className } = props

  return <div className={className}>COMPONENT_NAME Works!</div>
}
