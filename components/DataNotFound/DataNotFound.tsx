import { FC } from "react"

import { DataNotFoundProps } from "./DataNotFound.interface"

export const DataNotFound: FC<DataNotFoundProps> = (props) => {
  const { className } = props

  return (
    <div className={`text-center ${className}`}>
      <div className="text-center opacity-50">
        <div className="border-0 rounded-full mb-4">
          <img className="h-52" src="/assets/empty.svg" alt="nodata" />
        </div>
        <div className="text-xl font-medium">No Record Found</div>
      </div>
    </div>
  )
}
