import ReactDOM from 'react-dom';
import { Paper } from '@mui/material'

const DescModal = (props) => {

    const Backdrop = (props) => {
        return <div className="backdrop" />
    }

    const ModalOverlay = () => {
        return (
            <Paper>

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