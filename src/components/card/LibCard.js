import { Card, CardContent, CardMedia, Typography } from "@mui/material";

import "./Card.scss";

const LibCard = ({libData, setBookDetail}) => {
    return ( 
            <Card className="card" onClick={() => setBookDetail({data: libData, open: true})}>
                <CardMedia 
                    component="img"
                    alt={libData.title}
                    height="320"
                    image={libData.image}
                />
                <CardContent sx={{paddingTop: '5px'}}>
                    <Typography variant="body2" sx={{marginTop: '20px'}}>{libData.title}</Typography>
                </CardContent>
            </Card>
    );
}
 
export default LibCard;