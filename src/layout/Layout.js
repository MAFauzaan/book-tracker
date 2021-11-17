import React from 'react';
import { ThemeProvider } from '@mui/material';
import { theme } from '../theme/Theme';

import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

import './Layout.scss';


const Layout = (props) => {
    return (  
        <>
          <ThemeProvider theme={theme}>
                <div className="container">
                    <Navbar wallet={props.wallet} currentUser={props.currentUser}/>  
                        <main className="content" style={{minHeight: '400px'}}>
                            {props.children}
                        </main>
                    <Footer currentUser={props.currentUser} />
                </div>
            </ThemeProvider>
        </>
    );
}
 
export default Layout;