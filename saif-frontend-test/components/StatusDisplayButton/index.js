import { Typography } from "@mui/material"
import { styles } from "./style"

const StatusButton = ({isArchived}) => {
 return (
   <Typography sx={isArchived ? styles.archivedBtn : styles.unArchivedBtn}>{isArchived ? 'Archieved' : 'Unarchieve'}</Typography>
 )
}

export default StatusButton