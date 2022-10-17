import { useRouter } from "next/router"
import { FC } from "react"
import { Loader } from "../components/Loader"
import { URL_DASHBOARD } from "../router/routes"

const Index: FC = () => {
  const router = useRouter()
  router.push(URL_DASHBOARD)

  return <Loader />
}

export default Index
