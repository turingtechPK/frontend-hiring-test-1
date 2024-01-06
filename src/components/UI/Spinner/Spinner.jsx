import { Box, CircularProgress } from "@mui/material"
import { FlexCenter } from "../../Flex/Flex"

const Spinner = () => {
  return (
    <Box height={"89vh"} width={"100%"}>
      <FlexCenter height={"100%"}>
      <CircularProgress/>
      </FlexCenter>
    </Box>
  )
}

export default Spinner