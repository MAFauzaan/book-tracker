import ReactDOM from 'react-dom';
import { useState } from 'react';
import { 
    Grid , 
    Paper, 
    Typography, 
    FormControl, Select, 
    MenuItem, 
    ListItemText,
    OutlinedInput 
} from '@mui/material';

import "./BookDetailModal.scss";


const BookDetailModal = ({modal, setModal}) => {

    const { data } = modal;


    const imageUrl = `https://covers.openlibrary.org/b/isbn/${data.book_details[0].primary_isbn10}-L.jpg`;
    const bookDetails = data.book_details[0];
    const title = bookDetails.title;
    const author = bookDetails.author;
    const description = bookDetails.description;


    const Backdrop = () => {
        return <div className="backdrop" onClick={() => setModal({...modal, open: false})} />
    }

    const DetailModal = () => {

        const userOptions = [ 'Reading List', 'Read', 'Finished'];

        const [ userOption, setUserOption ] = useState('');
        console.log(userOption)

        return (
            <Paper className="overviewModal">
                <Grid container sx={{width: '100%'}}>
                    <Grid xs={12} sm={12} md={4} className="imageContainer">
                        <img src={imageUrl} alt={title} />
                    </Grid>

                    <Grid xs={12} sm={12} md={8} className="bookContent">
                        <Typography className="directory">{`> ${data.display_name} > ${title}`}</Typography>
                        <Typography className="author">{author}</Typography>
                        <Typography variant="h4">{title}</Typography>
                        <hr className="hr"/><br />
                        <Typography>{description}</Typography>
                        <Typography sx={{marginTop: '50px'}}>Rank: {data.rank}</Typography>
                        <Typography>Publisher: {bookDetails.publisher}</Typography>
                        <Typography>Publish Date: {data.published_date}</Typography>
                        <Typography>Best seller date: {data.bestsellers_date}</Typography>

                        <div className="userAction">
                        <Typography>User options:</Typography>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={userOption}
                                onChange={(e) => setUserOption(e.target.value)}
                                sx={{width: '240px'}}
                            >
                           {
                               userOptions.map((opt, idx) => (
                                   <MenuItem value={opt}>{opt}</MenuItem>
                               ))
                           }
                            </Select>
                        </FormControl>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    return (  
        <>
            {ReactDOM.createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(<DetailModal />, document.getElementById('overlay-root'))}
        </>
    );
}
 
export default BookDetailModal;