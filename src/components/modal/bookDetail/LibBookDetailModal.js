import ReactDOM from 'react-dom';
import { useState } from 'react';
import { 
    Grid , 
    Paper, 
    Typography, 
    FormControl, Select, 
    MenuItem, 
    Button,
    Alert
} from '@mui/material';

import "./BookDetailModal.scss";

const LibBookDetailModal = ({modal, setModal, contract }) => {
    const { data } = modal;

    const imageUrl = data.image;
    const title = data.title;
    const description = data.description;

    const Backdrop = () => {
        return <div className="backdrop" onClick={() => setModal({...modal, open: false})} />
    }
    
    const DetailModal = () => {
        
        const userOptions = [ 'List', 'Read', 'Finished'];
        
        const [ userOption, setUserOption ] = useState(data.status);

        const [ alert, setAlert ] = useState({
            showAlert: false,
            confirm: false,
            success: false
        });

        const [ saveAlert, setSaveAlert ] = useState(false)
        
        const bookData = {
            "book_id": data.book_id, 
            "status": userOption    
         }
        
        console.log(bookData);

        const onSubmit = (e) => {
            e.preventDefault();
            contract.update_book(bookData);

            setSaveAlert(true);

            setTimeout(() => {window.location.reload();}, 10000);
        };

        
        const onDelete = (e) => {
            e.preventDefault();
            setAlert(prevState => ({...prevState, showAlert: true}))
        }

        const handleClose = () => {
            setAlert(prevState => ({...prevState, showAlert: false}))
        }

        const deleteBook = (e) => {
            e.preventDefault();
            contract.delete_book({"book_id": data.book_id});
            setAlert(prevState => ({...prevState, success: true}));
            
            setTimeout(() => {window.location.reload();}, 10000);
        }

        return (
            <Paper className="overviewModal">
                <Grid container sx={{width: '100%'}}>
                    <Grid item xs={12} sm={12} md={4} className="imageContainer">
                        <img src={imageUrl} alt={title} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={8} className="bookContent">
                        <Typography variant="h4">{title}</Typography>
                        <hr className="hr"/><br />
                        <Typography>{description}</Typography>
                        <div className="userAction">
                        <FormControl fullWidth>
                            <Typography sx={{marginTop: '70px'}}>Change to: </Typography>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={userOption}
                                onChange={(e) => setUserOption(e.target.value)}
                                sx={{width: '240px'}}
                            >
                           {
                               userOptions.map((opt, idx) => (
                                   <MenuItem value={opt} key={idx}>{opt}</MenuItem>
                               ))
                           }
                            </Select>
                            <div className="buttonContainer" style={{marginTop: '20px'}}>
                                <Button 
                                    color="secondary"
                                    variant="contained"  
                                    sx={{width: '100px', color: '#ffff', marginRight: '10px'}}
                                    onClick={onSubmit}
                                >
                                    Save
                                </Button>
                                <Button 
                                    color="error"
                                    variant="outlined"  
                                    sx={{width: '140px', height: '38px'}}
                                    onClick={onDelete}
                                >
                                    Delete Book
                                </Button>
                            </div>
                            {
                                (alert.showAlert && !alert.success) ?
                                <Alert severity="warning" className="alert" action={
                                    <>
                                        <Button color="inherit" size="small" onClick={deleteBook}>
                                            Yes
                                        </Button>
                                        <Button color="inherit" size="small" onClick={handleClose}>
                                            No!
                                        </Button>
                                    </>
                                }
                                >
                                    Are you sure you want to delete this book?
                                </Alert>
                                :
                                (alert.showAlert && alert.success) ?
                                <Alert severity="success" className="alert">Book is being deleted, wait for 10 seconds! If the book hasn't updated yet, please refresh the page.</Alert>
                                :
                                saveAlert ?
                                <Alert severity="success" className="alert">Book is being updated, wait for 10 seconds! If the book hasn't deleted yet, please refresh the page.</Alert>
                                :
                                null
                            }
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
 
export default LibBookDetailModal;