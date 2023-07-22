import { Box, Button, Typography } from "@mui/material"
import { styles } from "./style"

export const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return hours > 0 ? `${hours} hours ${minutes} minutes ${seconds} seconds` : `${minutes} minutes ${seconds} seconds`;
};

const DurationCell = ({duration}) => {
    return (
        <Box>
            <Typography sx={styles.formatedDuration}>{formatTime(duration)}</Typography>
            <Typography sx={styles.duration}>{`(${duration} seconds)`}</Typography>
        </Box>
    )
}

export default DurationCell