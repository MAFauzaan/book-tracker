import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import SwiperCore, { Scrollbar } from "swiper";
import axios from "axios";

import { getBooks, getSpecifiedBooks } from '../../store/actions/booksActions'

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CardUI from "../../components/card/Card";
import NytLogo from "../../assets/nyt.svg"

import FilterModal from "../../components/modal/filter/FilterModal"
import BookDetailModal from "../../components/modal/bookDetail/BookDetailModal";

import 'swiper/swiper.scss'; 
import "swiper/modules/scrollbar/scrollbar.scss"
import "./Catalogue.scss"

SwiperCore.use([Scrollbar])

const Catalogue = () => {

    const dispatch = useDispatch();
    const books = useSelector(state => state.books.homeDisplayedBooks);
    const specifiedBooks = useSelector(state => state.books.fetchedBooks);

    const [ filter, setFilter ] = useState('');
    const [ filterModal, setFilterModal ] = useState(false);
    const [ bookDetailModal, setBookDetailModal ] = useState({
        data: {},
        open: false
    })
    
    const { data, open } = bookDetailModal

    const displayItems = ['Hardcover Fiction', 'Young Adult Hardcover', 'Business Books'];    

    useEffect(() => {
        if(books.length === 0) {
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
        }
        
        if(filter){
            axios.get(`https://api.nytimes.com/svc/books/v3/lists.json?list=${filter}&api-key=zf1MM73R7FJ2vPQgL25F00XEAbY4ZtJQ`)
            .then((result) => {
                console.log(result)
                dispatch(getSpecifiedBooks(result.data.results))
            }).catch((err) => {
                console.log(err)
            });
        }


    }, [dispatch, filter, books]);
    
    return (  
        <Container className="container">
            <h1>
                <img src={NytLogo} alt="New York Time's Logo" />
                New York Time's Best Sellers
            </h1>

            {
                filter &&
                <h1>{filter}</h1>
            }

            {
                !filter ?
                //Default
                <Grid className="booksSection">
                    {
                        displayItems.map(item => {

                            const listType = books.filter(({list_name}) => list_name === item)

                            return (
                                <div className="bookSection__bookContainer">
                                    <div className="bookContainer__listName">
                                        <h1>{item}</h1>
                                    </div>
                                    <Swiper 
                                        scrollbar={{"draggable": true, "hide": true}}
                                        slidesPerView={
                                            window.innerWidth < 600 ?
                                            1
                                            :
                                            window.innerWidth < 900 ?
                                            2
                                            :
                                            window.innerWidth < 1200 ?
                                            3
                                            :
                                            4
                                        }
                                        spaceBetween={0}
                                        className="booksSection__hardcoverFiction"
                                    >
                                    {
                                        listType.map(book => {
                                            const bookCover = book.book_details[0].primary_isbn10;
                
                                            return (
                                                <SwiperSlide key={bookCover}>
                                                    <CardUI 
                                                        key={bookCover}
                                                        bookData = {book}
                                                        setBookDetail = {setBookDetailModal}
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
                :
                <Grid container rowGap={5}>
                    {
                        specifiedBooks.map(book => {
                            const bookCover = book.book_details[0].primary_isbn10;

                            return(
                                <Grid xs={12} sm={6} md={4} lg={3} sx={{display: 'flex', placeContent: 'center'}} key={bookCover}>
                                    <CardUI bookData={book} setBookDetail = {setBookDetailModal}/>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            }

            <div className="filter" onClick={() => setFilterModal({...filterModal, open: true})}>
                <FilterAltIcon className="filter__filterIcon"/>
            </div>

            {
                filterModal.open &&
                <FilterModal setFilter={setFilter} setModal={setFilterModal}/>
            }

            {
                bookDetailModal.open &&
                <BookDetailModal modal={bookDetailModal} setModal={setBookDetailModal}/>
            }

        </Container>
    );
}
 
export default Catalogue;