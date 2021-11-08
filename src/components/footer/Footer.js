import { Button, Container, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import "./Footer.scss"

import Logo from '../../assets/Logo1.png'


const Footer = () => {
    return (  
        <Container maxWidth={false} className="footerContainer">
            <Grid container className="footerContainer--sitemap">
                <Grid item xs={12} sm={12} md={4} className="footerContainer__logo">
                    <img src={Logo} alt="BookIcon" /> 
                    <p>BookTracker is an online library filled with various types of reading for your needs.</p>
                </Grid>
                <Grid item xs={12} sm={6} md={2} className="footerContainer__links">
                    <ul>
                        <h3>MENU</h3>
                        <li>
                            <Link to="/">Homepage</Link>
                        </li>
                        <li>
                            <Link to="/library">Library</Link>
                        </li>
                    </ul>
                </Grid>

                <Grid item xs={12} sm={6} md={2} className="footerContainer__links">
                    <ul>
                        <h3>OTHERS</h3>
                        <li>
                            <Link to="#">About us</Link>
                        </li>
                        <li>
                            <Link to="#">FAQs</Link>
                        </li>
                        <li>
                            <Link to="#">Privacy Policy</Link>
                        </li>
                    </ul>
                </Grid>

                <Grid item xs={12} sm={12} md={4} className="footerContainer__links">
                    <h3>JOIN OUR NEWSLETTER</h3>
                    <div className="newsletterContainer">
                        <TextField 
                            placeholder="Email Address"
                            className="footerContainer__newsletterInput"
                        />
                        <Button color="primary" variant="contained">SIGN ME UP</Button>
                    </div>
                </Grid>
            </Grid>

            <Grid container className="footerContainer__copyright">
                <p>Copyright© 2021 All Rights Reserved</p>
            </Grid>
        </Container>
    );
}
 
export default Footer;