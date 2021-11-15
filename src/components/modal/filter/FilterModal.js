import ReactDOM from 'react-dom';
import { Grid , Paper } from '@mui/material';
import { useSelector } from 'react-redux';

import "./FilterModal.scss";

const DescModal = ({ setFilter, setModal}) => {

    const backdropHandler = () => {
        return setModal(true)
    }

    const filterHandler = (title) => {
        window.scrollTo(0, 0)
        setFilter(title)
        setModal(false)
    }

    const Backdrop = () => {
        return <div className="backdrop" onClick={backdropHandler} />
    }

    const ModalOverlay = () => {
        const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
        const booksList = useSelector(state => state.books.booksList); //Array of NYT's book list

        return (
            <Paper className="overviewModal">
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
                                            <p style={{margin: '5px 0'}} onClick={() => filterHandler(book)}>{book}<br/></p>
                                            })
                                        }
                                    </Grid>
                                )
                            })
                        }
                </Grid>
            </Paper>
        )
    }

    return (  
        <>
            {ReactDOM.createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(<ModalOverlay />, document.getElementById('overlay-root'))}
        </>
    );
}
 
export default DescModal;