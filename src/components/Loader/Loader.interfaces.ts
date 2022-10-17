import { SlidingCubeProps } from "react-loaders-kit/lib/slidingCube/SlidingCubeLoader"
import { Optional } from "../../types/types"

export interface LoaderProps extends Optional<SlidingCubeProps, "loading"> {
  className?: string
}
