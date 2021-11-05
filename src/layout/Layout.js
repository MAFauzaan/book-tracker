import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

import './Layout.scss';

const Layout = (props) => {
    return (  
        <>
            <Navbar />  
                <main>
                    {props.children}
                </main>
            <Footer />
        </>
    );
}
 
export default Layout;