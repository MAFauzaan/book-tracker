import { ThemeProvider } from '@mui/material';
import { theme } from '../theme/Theme'

import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

import './Layout.scss';

const Layout = (props) => {
    return (  
        <>
        <ThemeProvider theme={theme}>
            <Navbar />  
                <main>
                    {props.children}
                </main>
            <Footer />
        </ThemeProvider>
        </>
    );
}
 
export default Layout;