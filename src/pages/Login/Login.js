import { Paper, Container, Grid, Button} from "@mui/material";
import { useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import { setUserLoginData } from "../../store/actions/userActions";

import NearLogo from "../../assets/near.png"
import Logo from "../../assets/LogoHeader.png";

import "./Login.scss";

const Login = () => {                 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLoginHandler = () => {
        dispatch(setUserLoginData({id: 1, username: 'test'}));
        navigate('/');
    }

    return (  
            <Container>
                <Grid container className="container">
                    <Grid item xs={12} sx={{display: 'flex', placeContent: 'center', placeItems: 'center'}}>
                            <Paper className="loginFormContainer">
                        {
                            window.innerWidth > 700 ?
                            <>
                                <div className="imgContainer">
                                    <img src={Logo} alt="logo" className="logoTabletUp"/>
                                </div>

                                <div className="formContainer">
                                    <h2>Log in using Near Wallet</h2>
                                    <Button variant="contained" color="primary" onClick={userLoginHandler}>
                                        <img src={NearLogo} alt="near" className="nearLogo"/>Log in
                                    </Button>
                                </div>
                            </>
                            :
                            <>
                                <div className="formContainer">
                                <img src={Logo} alt="logo" className="logoPhone"/>
                                    <h2>Log in using Near Wallet</h2>
                                    <Button variant="contained" color="primary" onClick={userLoginHandler}>
                                       <img src={NearLogo} alt="near" className="nearLogo"/> Log in
                                    </Button>
                                </div>
                            </>
                        }
                            </Paper>
                     
                    </Grid>
                </Grid>
            </Container>   
    );
}
 
export default Login;