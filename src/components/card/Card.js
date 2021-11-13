import { Card, CardContent, CardMedia, Typography } from "@mui/material";

import "./Card.scss"

const CardUI = ({bookData}) => {
    const bookCover = bookData.book_details[0].primary_isbn10;

    return ( 
        <Card className="card">
            <CardMedia 
                component="img"
                alt={bookData.book_details[0].title}
                height="320"
                image={`https://covers.openlibrary.org/b/isbn/${bookCover}-L.jpg` || <p>Error</p>}
            />
            <CardContent sx={{paddingTop: '5px'}}>
                <Typography variant="body2" sx={{fontSize: '12px', color: '#6d6d6d', marginBottom: '10px'}}>
                    {bookData.book_details[0].author}
                </Typography>
                <Typography variant="body2">{bookData.book_details[0].title}</Typography>
            </CardContent>
        </Card>
    );
}
 
export default CardUI;