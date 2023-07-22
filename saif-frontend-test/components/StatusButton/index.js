import { Button } from "@mui/material"
import { styles } from "./style"

const StatusButton = ({isArchived}) => {
 return (
    <Button sx={isArchived ? styles.archivedBtn : styles.unArchivedBtn}>{isArchived ? 'Archieved' : 'Unarchieved'}</Button>
 )
}

export default StatusButton