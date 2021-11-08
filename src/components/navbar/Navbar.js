import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Drawer } from '@mui/material';
import { Menu } from '@mui/icons-material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Logo from '../../assets/LogoHeader.png';

import './Navbar.scss';

const Navbar = () => {
    
    const links = [
        {
            label: 'Home',
            to: '/'
        },
        {
            label: 'Library',
            to: '/library'
        }
    ]

    const [ mobile, setMobile ] = useState({
        isMobile: false,
        drawer: false
    })

    const {  isMobile, drawer } = mobile

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 600 ?
                setMobile((prevState) =>  ({...prevState, isMobile: true}))
                :
                setMobile((prevState) => ({...prevState, isMobile: false}))
        }

        setResponsiveness()

        window.addEventListener("resize",  () => setResponsiveness())
    }, []);

    const openDrawer = () => {
        return setMobile((prevState) => ({...prevState, openDrawer: true}))
    }

    const closeDrawer = () => {
        return setMobile((prevState) => ({...prevState, openDrawer: false}))
    }

    const LinksGroup = () => {
        return(
            links.map(link => {
                return (
                    <NavLink 
                        to={link.to} 
                        style={!isMobile? {margin: '0px 15px'} : {margin: '15px 0'}}
                    >
                        {link.label}
                    </NavLink>
                )
            })
        )
    }

    return (  
        <AppBar elevation={0} position="static" className="navbar" color="primary">
            <Toolbar className="navbar__toolbar">
                {
                    isMobile &&
                    <>
                        <IconButton {...{edge: 'start', 'aria-label': 'menu', 'aria-haspopup': 'true', onClick: openDrawer}}>
                            <Menu />
                        </IconButton>

                        <Drawer {...{anchor: 'left', open: openDrawer, onClose: closeDrawer}}>
                            <LinksGroup />
                        </Drawer>
                    </>
                }

                <NavLink to='/' className="toolbar__logoContainer">
                    <img src={Logo} alt="Logo" />
                </NavLink>

                {
                    !isMobile &&
                    <div className="toolbar__linksContainer">
                        <LinksGroup />
                    </div>
                }
            </Toolbar>
        </AppBar>
    );
}
 
export default Navbar;