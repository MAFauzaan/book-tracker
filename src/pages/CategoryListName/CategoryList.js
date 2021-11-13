import { Container, Grid } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecifiedBooks } from "../../store/actions/booksActions";
import { useParams } from "react-router-dom";

import CardUI from "../../components/card/Card";

import "./CategoryList.scss";

const CategoryList = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const fetchedBooks = useSelector(state => state.books.fetchedBooks) ;

    const books = fetchedBooks.filter(({list_name}) => list_name === params.listname);

    useEffect(() => {
        axios.get(`https://api.nytimes.com/svc/books/v3/lists.json?list=${params.listname}&api-key=zf1MM73R7FJ2vPQgL25F00XEAbY4ZtJQ`)
        .then((result) => {
            console.log(result.data)
            dispatch(getSpecifiedBooks(result.data.results))
        }).catch((err) => {
            console.log(err)
        });
    }, [params, dispatch]);

    return (  
        <Container>
            <h1>{params.listname}</h1>
            <Grid container className="bookContainer">
                {
                    books.map(book => {
                        const bookCover = book.book_details[0].primary_isbn10;

                        return (
                            <CardUI 
                                key={bookCover}
                                bookData={book}
                            />
                        )
                    })
                }
            </Grid>
        </Container>
    );
}
 
export default CategoryList;