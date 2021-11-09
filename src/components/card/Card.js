import { Card, CardContent, CardMedia } from "@mui/material";

import "./Card.scss"

const CardUI = (props) => {
    console.log(props)
    return ( 
        <Card className="card">
            <CardMedia 
                component="image"
                alt={props.name}
                height="140"
                image={props.src}
            />
            <CardContent>
                {props.name}
            </CardContent>
        </Card>
    );
}
 
export default CardUI;