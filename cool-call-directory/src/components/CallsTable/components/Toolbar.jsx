import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArchiveIcon from '@mui/icons-material/Archive';
import { alpha } from '@mui/material/styles';
import { Tooltip } from '@mui/material';


export default function CallsTableToolbar({ numSelected, onArchive, onSelectFilter }) {
    return (
        <Toolbar
        sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
            bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
        }}
        >
        {numSelected > 0 ? (
            <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
            >
            {numSelected} selected
            </Typography>
        ) : (
            <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            fontWeight={'bold'}
            id="tableTitle"
            component="div"
            >
            Calls
            </Typography>
        )}

        {numSelected > 0 ? (
            <Tooltip title="Archive">
                <IconButton onClick={onArchive}>
                    <ArchiveIcon/>
                </IconButton>
            </Tooltip>
        ) : (
            <Tooltip title="Filter list">
                <IconButton>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
        )}
        </Toolbar>
    );
}

CallsTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};  