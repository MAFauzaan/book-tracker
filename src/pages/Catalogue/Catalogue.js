import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid } from "@mui/material";
import axios from "axios";

import { getBooks } from '../../store/actions/booksActions'

import CardUI from "../../components/card/Card";
import NytLogo from "../../assets/nyt.svg"

import "./Catalogue.scss"

const Catalogue = () => {

    const dispatch = useDispatch();
    const books = useSelector(state => state.books.fetchedBooks);

    const filteredHardCover = books.filter(({list_name}) => list_name === 'Hardcover Fiction');
    const hardCoverFiction = filteredHardCover.slice(0,5)
    

    useEffect(() => {
        axios.get('https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=zf1MM73R7FJ2vPQgL25F00XEAbY4ZtJQ')
        .then((result) => {
            dispatch(getBooks(result.data.results))
        }).catch((err) => {
            console.log(err)
        });

        axios.get('https://api.nytimes.com/svc/books/v3/lists.json?list=Young Adult Hardcover&api-key=zf1MM73R7FJ2vPQgL25F00XEAbY4ZtJQ')
        .then((result) => {
            dispatch(getBooks(result.data.results))
        }).catch((err) => {
            console.log(err)
        });

        
        axios.get('https://api.nytimes.com/svc/books/v3/lists.json?list=Business Books&api-key=zf1MM73R7FJ2vPQgL25F00XEAbY4ZtJQ')
        .then((result) => {
            dispatch(getBooks(result.data.results))
        }).catch((err) => {
            console.log(err)
        });

    }, [dispatch]);

    console.log(hardCoverFiction)
    
    return (  
        <Container className="container">
            <h1>
                <img src={NytLogo} alt="New York Time's Logo" />
                New York Time's Best Sellers Catalogue
            </h1>

            <Grid className="books__Section">
                <div>
                {
                    hardCoverFiction.map(book => {
                        const bookCover = book.isbns[0].isbn10 || book.isbns[1].isbn10;

                        return (
                            <CardUI 
                                key={bookCover}
                                name={book.book_details[0].title}
                                author={book.book_details[0].author}
                                src={`https://covers.openlibrary.org/b/isbn/${bookCover}-M.jpg`}
                            />
                        )
                    })
                }
                </div>
            </Grid>
        </Container>
    );
}
 
export default Catalogue;