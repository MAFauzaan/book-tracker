import { Card, CardContent, CardMedia } from "@mui/material";

const CardUI = (props) => {
    return ( 
        <Card>
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