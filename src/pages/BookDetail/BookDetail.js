import { Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import "./BookDetail.scss";

const BookDetail = () => {
    
    const params = useParams();
    console.log(params)

    return (  
        <Container maxWidth={false} className="bookDetail__Container">
            {/* <Grid container className="content__Container">
                <Grid item xs={12} sm={12} md={6} className="img_container">
                    <img src={`https://covers.openlibrary.org/b/isbn/${book.book_details[0].primary_isbn10}-L.jpg`} alt={book.book_details[0].title}/>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                    <Typography>{book_detail.author}</Typography>
                </Grid>
            </Grid> */}
        </Container>
    );
}
 
export default BookDetail;
