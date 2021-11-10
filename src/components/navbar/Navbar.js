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
            label: 'Catalogue',
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
        return setMobile((prevState) => ({...prevState, drawer: true}))
    }

    const closeDrawer = () => {
        return setMobile((prevState) => ({...prevState, drawer: false}))
    }

    const LinksGroup = () => {
        return(
            links.map((link, index) => {
                return (
                    <NavLink 
                        key={index}
                        to={link.to} 
                        style={({ isActive }) =>
                        (isActive && !isMobile) ? 
                            {borderBottom: '3px solid #F29D16'} 
                            : 
                        (isActive && isMobile) ?
                            {backgroundColor: '#d2d2d2'}
                            :
                        null
                      }
                        className="link"
                    >
                        {link.label}
                    </NavLink>
                )
            })
        )
    }

    return (  
        <>
        <div style={{backgroundColor: '#F4F5F7' , height: '25px', width: '100%'}}/>
        <AppBar elevation={0} position="static" className="navbar" color="primary">
            <Toolbar className="navbar__toolbar">
                {
                    isMobile &&
                    <>
                        <IconButton {...{edge: 'start', 'aria-label': 'menu', 'aria-haspopup': 'true', onClick: openDrawer}}>
                            <Menu />
                        </IconButton>

                        {
                            drawer ?
                            <Drawer {...{anchor: 'left', open: openDrawer, onClose: closeDrawer}} className="toolbar_drawer">
                                <div className="toolbar__linksContainer">
                                    <LinksGroup />
                                </div>
                            </Drawer>
                            :
                            null
                        }
                    </>
                }

                <div className="toolbar_leftContainer">
                    <NavLink to='/'  className="toolbar__logoContainer">
                        <img src={Logo} alt="Logo" />
                    </NavLink>
                {
                    !isMobile &&
                    <div className="toolbar__linksContainer">
                        <LinksGroup />
                    </div>
                }
                </div>

                <IconButton {...{edge: 'end', 'aria-label': 'menu', 'aria-haspopup': 'true', onClick: openDrawer}}>
                    <AccountCircleIcon fontSize='large' />
                </IconButton>

            </Toolbar>
        </AppBar>
        </>
    );
}
 
export default Navbar;