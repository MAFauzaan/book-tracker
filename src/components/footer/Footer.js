import { Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";

import "./Footer.scss"

import Logo from '../../assets/Logo1.png'


const Footer = () => {
    return (  
        <Container maxWidth={false} className="footerContainer">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4} className="footerContainer__logo">
                    <img src={Logo} alt="BookIcon" /> 
                    <p>BookTracker is an online library filled with various types of reading for your needs.</p>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Grid container>
                        <Grid item>
                            <ul>
                                <h3>MENU</h3>
                                <li>
                                    <Link to="/">Homepage</Link>
                                </li>
                                <li>
                                    <Link to="/">Library</Link>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container className="footerContainer__copyright">
                <p>Copyright© 2021 All Rights Reserved</p>
            </Grid>
        </Container>
    );
}
 
export default Footer;