import { Container, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecifiedBooks } from "../../store/actions/booksActions";
import { useParams } from "react-router-dom";

import CardUI from "../../components/card/Card";
import DescModal from "../../components/modal/DescModal";

import "./CategoryList.scss";

const CategoryList = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const fetchedBooks = useSelector(state => state.books.fetchedBooks) ;

    const books = fetchedBooks.filter(({list_name}) => list_name === params.listname);

    const [ openModal, setOpenModal ] = useState({
        data: {},
        open: false
    });

    const { data, open } = openModal;

    useEffect(() => {
        axios.get(`https://api.nytimes.com/svc/books/v3/lists.json?list=${params.listname}&api-key=zf1MM73R7FJ2vPQgL25F00XEAbY4ZtJQ`)
        .then((result) => {
            dispatch(getSpecifiedBooks(result.data.results))
        }).catch((err) => {
            console.log(err)
        });
    }, [params, dispatch]);

    const modalHandler = (data) => {
       setOpenModal({ data, open: true })
    }

    console.log(openModal)

    return (  
        <>
            <Container>
                <h1 style={{placeContent: 'center'}}>{params.listname}</h1>
                <Grid container className="bookContainer">
                    {
                        books.map(book => {
                            const bookCover = book.book_details[0].primary_isbn10;

                            return (
                                <div onClick={() => modalHandler(book)}>
                                    <CardUI 
                                        key={bookCover}
                                        bookData={book}
                                    />
                                </div>
                            )
                        })
                    }
                </Grid>
            </Container>

            {
                (Object.keys(data).length !== 0 && open) &&
                <DescModal data={data} closeModal={setOpenModal}/>
            }
        </>
    );
}
 
export default CategoryList;