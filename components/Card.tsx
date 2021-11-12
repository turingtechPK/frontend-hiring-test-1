import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function CardComponent(props: any) {
    const {item} = props;
    return (
        <Card
            sx={{ height: '100%', width: '300px', display: 'flex', flexDirection: 'column' }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
                ID: {item.id}
            </Typography>
            <Typography>
                Call Type: {item.call_type}
            </Typography>
            <Typography>
                Call Duration: {new Date(item.duration * 1000).toISOString().substr(11, 8)}
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small">From: {item.from}</Button>
            <Button size="small">To: {item.to}</Button>
            </CardActions>
        </Card>
    )
}

export default CardComponent;