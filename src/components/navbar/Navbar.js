import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Drawer, Button, Menu, MenuItem, Fade } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../store/actions/userActions';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Logo from '../../assets/LogoHeader.png';

import './Navbar.scss';

const Navbar = () => {

    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    
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

    const conditionalLink = [
        {
            label: 'Home',
            to: '/'
        }
    ]

    const [ mobile, setMobile ] = useState({
        isMobile: false,
        drawer: false
    })
    
    const {  isMobile, drawer } = mobile

    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);

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

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        return dispatch(userLogout())
    }

    const LinksGroup = () => {
        let link;
        isLoggedIn ? link = links : link=conditionalLink

        return(
            link.map((link, index) => {
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
        <div style={{backgroundColor: 'rgb(242, 157, 22)' , height: '25px', width: '100%'}}/>
        <AppBar elevation={0} position="static" className="navbar" color="primary">
            <Toolbar className="navbar__toolbar">
                {
                    isMobile &&
                    <>
                        <IconButton {...{edge: 'start', 'aria-label': 'menu', 'aria-haspopup': 'true', onClick: openDrawer}}>
                            <MenuIcon />
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

                {
                    !isLoggedIn ?
                    <Link to="/login" style={{color: '#2C2C2C', textDecoration: 'none'}}>
                        <Button>Log in</Button>
                    </Link>
                    :
                    <>
                        <IconButton {...{edge: 'end', 'aria-label': 'menu', 'aria-haspopup': 'true', onClick: openDrawer}} onClick={(e) => setAnchorEl(e.currentTarget)}>
                            <AccountCircleIcon fontSize='large'/>
                        </IconButton>
                        <Menu
                            id="fade-menu"
                            MenuListProps={{
                            'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={handleClose}>{user.username}</MenuItem>
                            <MenuItem onClick={handleLogout}>Log out</MenuItem>
                        </Menu>
                    </>
                }

            </Toolbar>
        </AppBar>
        </>
    );
}
 
export default Navbar;