import ReactDOM from 'react-dom';
import { Typography, Paper} from '@mui/material';

import "./DescModal.scss";

const DescModal = ({ data, closeModal}) => {

    const backdropHandler = () => {
        return closeModal({data: {}, open: false})
    }

    const Backdrop = () => {
        return <div className="backdrop" onClick={backdropHandler} />
    }

    const ModalOverlay = () => {
        return (
            <Paper className="overviewModal">
                <div className="overviewModal__imageContainer" style={{backgroundImage: `url(https://covers.openlibrary.org/b/isbn/${data.book_details[0].primary_isbn10}-L.jpg)`}}>
                </div>
                <div className="imageContainer__details">
                    <Typography variant="body2" className="author">
                        {data.book_details[0].author}
                    </Typography>

                    <Typography variant="h6">{data.book_details[0].title}</Typography>
                    
                    <Typography variant="body1" sx={{textAlign: 'left', marginTop: '10px', color: ''}}>
                        {data.book_details[0].description.slice(0, 90)}...
                    </Typography>

                    <p className="seeMore">See More...</p>
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