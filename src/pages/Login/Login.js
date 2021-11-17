import { useEffect } from "react";
import { Paper, Container, Grid, Button} from "@mui/material";
import { useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router-dom';

import NearLogo from "../../assets/near.png";
import Logo from "../../assets/LogoHeader.png";

import "./Login.scss";

const Login = ({ nearConfig, wallet, currentUser }) => {                 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(wallet.isSignedIn()) {
            navigate('/');
        }
    }, [wallet, dispatch, currentUser, navigate]);

    const userLoginHandler = () => {
        wallet.requestSignIn(
            nearConfig.contractName,
            'BookTracker'
        );
    };

    console.log(currentUser);

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