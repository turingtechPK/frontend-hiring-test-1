import { Box, MenuItem, OutlinedInput, Select, Typography } from "@mui/material"
import { styles } from "./style"

const Filter = (props) => {
    const {filter, setFilter} = props
    return (
        <Box sx={styles.filterContainer}>
            <Typography>Filter By</Typography>
            <Select
                id="demo-simple-select"
                value={filter}
                onChange={(e) => {setFilter(e.target.value)}}
                sx={styles.dropdown}
            >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={1}>Archived</MenuItem>
                <MenuItem value={2}>Unarchived</MenuItem>
            </Select>
        </Box>
    )
}

export default Filter