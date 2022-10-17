import { FC } from "react"
import { SlidingCubeLoader } from "react-loaders-kit"
import { themeColor } from "../../styles/MuiTheme"

import { LoaderProps } from "./Loader.interfaces"

export const Loader: FC<LoaderProps> = (props) => {
  const { className, loading = true, ...rest } = props

  return (
    <div className={`${className} m-auto h-full flex items-center justify-center flex-col`}>
      <SlidingCubeLoader
        colors={[themeColor.primary.main, themeColor.primary.main]}
        loading={loading}
        {...rest}
      />
    </div>
  )
}
