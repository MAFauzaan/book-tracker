import { Card, CardContent, CardMedia, Typography } from "@mui/material";

import "./Card.scss"

const CardUI = (props) => {
    return ( 
        <Card className="card">
            <CardMedia 
                component="img"
                alt={props.name}
                height="280"
                image={props.src || <p>Error</p>}
            />
            <CardContent sx={{paddingTop: '5px'}}>
                <Typography variant="body2" sx={{fontSize: '12px', color: '#6d6d6d', marginBottom: '10px'}}>
                    {props.author}
                </Typography>
                <Typography variant="body2">{props.name}</Typography>
            </CardContent>
        </Card>
    );
}
 
export default CardUI;