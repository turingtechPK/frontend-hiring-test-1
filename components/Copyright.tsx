import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function CopyrightComponent(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="#">
          Omar Farooq
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
};

export default CopyrightComponent;
