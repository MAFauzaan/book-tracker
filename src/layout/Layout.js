import { ThemeProvider } from '@mui/material';
import { theme } from '../theme/Theme'

import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

import './Layout.scss';

const Layout = (props) => {
    return (  
        <ThemeProvider theme={theme}>
            <div className="container">
                <Navbar />  
                    <main className="content" style={{minHeight: '400px'}}>
                        {props.children}
                    </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}
 
export default Layout;