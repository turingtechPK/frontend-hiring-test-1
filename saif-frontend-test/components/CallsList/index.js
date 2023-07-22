import { Box, CircularProgress, Pagination, Typography } from "@mui/material"
import Filter from "../Filter"
import { useEffect, useState } from "react"
import { getCalls } from "../../utils/API";
import CustomTableComponent from "../TableComponent";
import { columns } from "../../utils/constant";
import { styles } from "./style";
import PaginationComponent from "../PaginationComponent";
import { useRouter } from 'next/router'
import CallModal from "../CallModal";

const CallsList = () => {
    const [callsData, setCallsData] = useState([])
    const [allData, setAllData] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [filter, setFilter] = useState(0)
    const [open, setOpen] = useState(false)
    const [selectedCall, setSelectedCall] = useState({})
    const router = useRouter()

    const getCallsData = async () => {
        setIsLoading(true)
        const response = await getCalls(pageNumber)
        if (response.error) {
            console.log(response?.error)
            // if (response?.error?.response?.status == 401) {
            // }
        }
        else{
            setCallsData(response?.data?.nodes)
            setAllData(response?.data?.nodes)
            setTotalPages(Math.ceil(response?.data?.totalCount / 10))
            setTotalCount(response?.data?.totalCount)
        }
        setIsLoading(false)
    }

    useEffect(()=>{
        getCallsData()
    }, [pageNumber])

    const handlePageChange = (event, newPageNumber) => {
        setFilter(0)
        setPageNumber(parseInt(newPageNumber))
    }

    const handleFilter = () => {
        let dataArray = [...allData]
        let tempArray = []
        if (filter === 1){
            tempArray = dataArray.filter(call => {
                return call.is_archived === true
            })
        }
        else if (filter === 2){
            tempArray = dataArray.filter(call => {
                return call.is_archived === false
            })
        }
        else {
            tempArray = dataArray
        }
        setCallsData(tempArray)
    }

    useEffect(()=>{
        handleFilter()
    }, [filter])

    return (
        <Box sx={styles.mainContainer}>
            <Typography variant="h4">Turing Technologies Frontend Test</Typography>
            <Filter filter={filter} setFilter={setFilter} />
            {isLoading ? <Box sx={styles.loaderContainer}><CircularProgress /></Box> :
            <><CustomTableComponent columns={columns} rows={callsData} setOpen={setOpen} setSelectedCall={setSelectedCall} />
            {totalPages > 0 && <PaginationComponent count={totalPages} page={pageNumber} totalCount={totalCount} onChange={handlePageChange} />}</>}
            <CallModal open={open} setOpen={setOpen} selectedCall={selectedCall} />
        </Box>
    )
}

export default CallsList