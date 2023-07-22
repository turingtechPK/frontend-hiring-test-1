import React from 'react'
import { styles } from './style'
import { Box, Pagination, Typography } from '@mui/material'

const PaginationComponent = (props) => {
  const {count, page, onChange, totalCount} = props
  
  const calculatePagination = (total, pageSize, currentPage) => {
    const start = currentPage - (currentPage - 1) + (currentPage - 1) * pageSize
    let end = start + (pageSize - 1)
    if (count == currentPage && total % pageSize !== 0) {
      end = start + ((total % pageSize) - 1)
    }
    return `${start} - ${end}`
  }
  return (
    <Box sx={styles.paginationContainer}>
      <Pagination count={count} page={page} onChange={onChange} variant="outlined" shape="rounded" />
      <Typography sx={styles.paginationText}>{calculatePagination(totalCount, 10,page)} of {totalCount}</Typography>
    </Box>
  )
}

export default PaginationComponent