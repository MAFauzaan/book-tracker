import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import NytLogo from "../../assets/nyt.svg"

import "./FullCatalogue.scss";

const FullCatalogue = () => {

    const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

    const booksList = useSelector(state => state.books.booksList); //Array of NYT's book list

    return (  
        <Container className="container">
            <h1>
                <img src={NytLogo} alt="nyt"/>Full Book Catalogue
            </h1>
            <Grid container>
            {
                alphabet.map(item => {
                    return (
                        <Grid item xs={12} sm={12} md={6} lg={4} >
                            <h2 style={{display: 'inline-block'}}>{item}</h2><br />
                            {
                                booksList.map(book => {
                                    const firstLetter = book.charAt(0)
                                    
                                   return item === firstLetter && 
                                   <Link to={`/catalogue/${book}`} style={{margin: '5px 0'}}>{book}<br/></Link>
                                })
                            }
                        </Grid>
                    )
                })
            }
            </Grid>
        </Container>
    );
}
 
export default FullCatalogue;