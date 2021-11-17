import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import SwiperCore, { Scrollbar } from "swiper";
import axios from "axios";

import { getBooks, getSpecifiedBooks } from '../../store/actions/booksActions'

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CardUI from "../../components/card/Card";
import NytLogo from "../../assets/nyt.svg";

import FilterModal from "../../components/modal/filter/FilterModal";
import BookDetailModal from "../../components/modal/bookDetail/BookDetailModal";

import 'swiper/swiper.scss'; 
import "swiper/modules/scrollbar/scrollbar.scss";
import "./Catalogue.scss";

SwiperCore.use([Scrollbar]);

const Catalogue = ({contract, currentUser}) => {

    const dispatch = useDispatch();
    const books = useSelector(state => state.books.homeDisplayedBooks);
    const specifiedBooks = useSelector(state => state.books.fetchedBooks);


    const [ filter, setFilter ] = useState('');
    const [ filterModal, setFilterModal ] = useState(false);
    const [ bookDetailModal, setBookDetailModal ] = useState({
        data: {},
        open: false
    });
    const [ view, setView ] = useState({
        mobile: false,
        tabletPortrait: false,
        tabletLandscape: false,
        laptop: true
    });

    
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
        };
        
        if(filter){
            axios.get(`https://api.nytimes.com/svc/books/v3/lists.json?list=${filter}&api-key=zf1MM73R7FJ2vPQgL25F00XEAbY4ZtJQ`)
            .then((result) => {
                console.log(result)
                dispatch(getSpecifiedBooks(result.data.results))
            }).catch((err) => {
                console.log(err)
            });
        };


    }, [dispatch, filter, books]);

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 600 ?
                setView({
                    mobile: true,
                    tabletPortrait: false,
                    tabletLandscape: false,
                    laptop: false
                })
                :
                (window.innerWidth > 600 && window.innerWidth < 900) ?
                setView({
                    mobile: false,
                    tabletPortrait: true,
                    tabletLandscape: false,
                    laptop: false
                })
                :
                (window.innerWidth > 900 && window.innerWidth < 1200) ?
                setView({
                    mobile: false,
                    tabletPortrait: false,
                    tabletLandscape: true,
                    laptop: false
                })
                :
                setView({
                    mobile: false,
                    tabletPortrait: false,
                    tabletLandscape: false,
                    laptop: true
                })
        };

        setResponsiveness();


        window.addEventListener("resize",  () => setResponsiveness())

    }, []);
    
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
                                        <hr />
                                    </div>
                                    <Swiper 
                                        scrollbar={{"draggable": true, "hide": true}}
                                        slidesPerView={
                                            view.mobile ?
                                            1
                                            :
                                            view.tabletPortrait ?
                                            2
                                            :
                                            view.tabletLandscape ?
                                            3
                                            :
                                            4
                                        }
                                        spaceBetween={
                                            view.mobile ?
                                            80
                                            :
                                            0
                                        }
                                        className="bookContainer__swiper"
                                        centeredSlides={
                                            window.innerWidth < 600 ?
                                           true
                                           :
                                           false
                                        }
                                    >
                                    {
                                        listType.map(book => {
                                            const bookCover = book.book_details[0].primary_isbn10;
                
                                            return (
                                                <SwiperSlide key={bookCover} className="swiperSlide">
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
                                    <CardUI 
                                        bookData={book} 
                                        setBookDetail = {setBookDetailModal} 
                                    />
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
                <BookDetailModal 
                    modal={bookDetailModal} 
                    setModal={setBookDetailModal} 
                    contract={contract}
                    currentUser={currentUser}
                />
            }

        </Container>
    );
}
 
export default Catalogue;