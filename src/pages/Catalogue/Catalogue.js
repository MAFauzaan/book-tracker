import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid } from "@mui/material";
import axios from "axios";

import { getBooks } from '../../store/actions/booksActions'

import CardUI from "../../components/card/Card";

import "./Catalogue.scss"

const Catalogue = () => {

    const dispatch = useDispatch();
    const books = useSelector(state => state.books.fetchedBooks);

    console.log(books)

    useEffect(() => {
        axios.get('https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=zf1MM73R7FJ2vPQgL25F00XEAbY4ZtJQ')
        .then((result) => {
            dispatch(getBooks(result.data.results))
        }).catch((err) => {
            console.log(err)
        });
    }, [dispatch]);

    return (  
        <Container className="container">
            <h1>BookTracker's Best Seller Catalogue</h1>

            <Grid className="books__Container">
                {
                    books.map(book => {
                        const bookCover = book.isbns[0].isbn10 || book.isbns[1].isbn10;

                        return (
                            <CardUI 
                                key={bookCover}
                                name={book.book_details[0].title}
                                author={book.book_details[0].author}
                                src={`https://covers.openlibrary.org/b/isbn/${bookCover}-L.jpg`}
                            />
                        )
                    })
                }
            </Grid>
        </Container>
    );
}
 
export default Catalogue;