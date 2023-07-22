import React from 'react'
import { styles } from './style'
import { Box, Pagination, Typography } from '@mui/material'

const PaginationComponent = (props) => {
  const {count, page, onChange} = props
  return (
    <Box sx={styles.paginationContainer}>
      <Pagination count={count} page={page} onChange={onChange} variant="outlined" shape="rounded" />
      <Typography>1 - 10 of </Typography>
    </Box>
  )
}

export default PaginationComponent