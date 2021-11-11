import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import SwiperCore, { Scrollbar } from "swiper";
import { Link } from "react-router-dom";
import axios from "axios";

import { getBooks } from '../../store/actions/booksActions'

import CardUI from "../../components/card/Card";
import NytLogo from "../../assets/nyt.svg"

import 'swiper/swiper.scss'; 
import "swiper/modules/scrollbar/scrollbar.scss"
import "./Catalogue.scss"

SwiperCore.use([Scrollbar])

const Catalogue = () => {

    const dispatch = useDispatch();
    const books = useSelector(state => state.books.fetchedBooks);

    const displayItems = ['Hardcover Fiction', 'Young Adult Hardcover', 'Business Books'];    

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
    
    return (  
        <Container className="container">
            <h1>
                <img src={NytLogo} alt="New York Time's Logo" />
                New York Time's Best Sellers Catalogue
            </h1>

            <Grid className="booksSection">
                {
                    displayItems.map(item => {

                        const listType = books.filter(({list_name}) => list_name === item).slice(0, 10)

                        return (
                            <div className="bookSection__bookContainer">
                                <div className="bookContainer__listName">
                                    <h1>{item}</h1>
                                </div>
                                <Swiper 
                                    scrollbar={{"draggable": true, "hide": true}}
                                    slidesPerView={4}
                                    spaceBetween={0}
                                    className="booksSection__hardcoverFiction"
                                >
                                {
                                    listType.map(book => {
                                        const bookCover = book.isbns[0].isbn10 || book.isbns[1].isbn10;
            
                                        return (
                                            <SwiperSlide>
                                            <CardUI 
                                                key={bookCover}
                                                name={book.book_details[0].title}
                                                author={book.book_details[0].author}
                                                src={`https://covers.openlibrary.org/b/isbn/${bookCover}-M.jpg`}
                                            />
                                            </SwiperSlide>
                                        )
                                    })
                                }
                                </Swiper>
                        </div>
                        )
                    })
                }
              
            </Grid>
            <Link to="/full" style={{textAlign: 'center', textDecoration: 'none'}}>
                <h3>More on our full catalogue</h3>
            </Link>
        </Container>
    );
}
 
export default Catalogue;