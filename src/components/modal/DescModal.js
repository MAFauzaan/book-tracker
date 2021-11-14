import ReactDOM from 'react-dom';
import { Typography, Paper} from '@mui/material';
import { Link, useParams, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSpecifiedBook } from '../../store/actions/booksActions';

import "./DescModal.scss";

const DescModal = ({ data, closeModal}) => {

    const dispatch = useDispatch();
    const params = useParams();

    const title = data.book_details[0].title;
    const author = data.book_details[0].author;
    const description = data.book_details[0].description.slice(0, 90);

    const backdropHandler = () => {
        return closeModal({data: {}, open: false})
    }

    const Backdrop = () => {
        return <div className="backdrop" onClick={backdropHandler} />
    }

    const setDataHandler = () => {
        dispatch(setSpecifiedBook(data))
    }

    const ModalOverlay = () => {
        return (
            <Paper className="overviewModal">
                <div className="overviewModal__imageContainer" style={{backgroundImage: `url(https://covers.openlibrary.org/b/isbn/${data.book_details[0].primary_isbn10}-L.jpg)`}}>
                </div>
                <div className="imageContainer__details">
                    <Typography variant="body2" className="author">{author}</Typography>

                    <Typography variant="h6">{title}</Typography>
                    
                    <Typography variant="body1" sx={{textAlign: 'left', marginTop: '10px'}}>
                        {description}...
                    </Typography>

                    <Link to={`/catalogue/${params.listname}/${title}`} onClick={setDataHandler} className="seeMore">See More...</Link>
                </div>  
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