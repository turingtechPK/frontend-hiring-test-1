import { Box, Pagination, Typography } from "@mui/material"
import Filter from "../Filter"
import { useEffect, useState } from "react"
import { getCalls } from "../../utils/API";
import CustomTableComponent from "../TableComponent";
import { columns } from "../../utils/constant";
import { styles } from "./style";
import PaginationComponent from "../PaginationComponent";

const CallsList = () => {
    const [callsData, setCallsData] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const getCallsData = async () => {
        const response = await getCalls(pageNumber)
        console.log("testt", response)
        if (response.error) {
            console.log(response.error)
        }
        else{
            setCallsData(response?.data?.nodes)
            setTotalPages(Math.ceil(response?.data?.totalCount / 10))
        }
    }

    useEffect(()=>{
        getCallsData()
    }, [pageNumber])

    const handlePageChange = (newPageNumber) => {
        setPageNumber(newPageNumber?.target?.innerText)
    }

    return (
        <Box sx={styles.mainContainer}>
            <Typography>Turing Technologies Frontend Test</Typography>
            <Filter />
            <CustomTableComponent columns={columns} rows={callsData} />
            {totalPages > 0 && <PaginationComponent count={totalPages} page={pageNumber} onChange={handlePageChange} />}
        </Box>
    )
}

export default CallsList