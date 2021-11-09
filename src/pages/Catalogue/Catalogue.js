import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import axios from "axios";

import { getBooks } from '../../store/actions/booksActions'

import CardUI from "../../components/card/Card";

const Catalogue = () => {

    const dispatch = useDispatch();
    const books = useSelector(state => state.books.fetchedBooks);

    useEffect(() => {
        axios.get('https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=zf1MM73R7FJ2vPQgL25F00XEAbY4ZtJQ')
        .then((result) => {
            dispatch(getBooks(result.data.results))
        }).catch((err) => {
            console.log(err)
        });
    }, [dispatch]);

    return (  
        <Container>
            <h1>Homepage</h1>

            {
                books.map(book => {
                    return (
                        <CardUI 
                            name={book.book_details[0].title}
                            src={book.amazon_product_url}
                        />
                    )
                })
            }
        </Container>
    );
}
 
export default Catalogue;