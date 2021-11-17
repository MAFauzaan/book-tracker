import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate} from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Drawer, Button, Menu, MenuItem, Fade } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Logo1 from '../../assets/LogoHeader.png';
import Icon from '../../assets/icon.png';

import './Navbar.scss';

const Navbar = ({wallet, currentUser}) => {

    const user = currentUser;

    const navigate = useNavigate();
    
    const links = [
        {
            label: 'Home',
            to: '/'
        },
        {
            label: 'Library',
            to: '/library'
        }
    ];

    const conditionalLink = [
        {
            label: 'Home',
            to: '/'
        }
    ];

    const [ mobile, setMobile ] = useState({
        isMobile: false,
        drawer: false
    });
    
    const {  isMobile, drawer } = mobile;

    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 600 ?
                setMobile((prevState) =>  ({...prevState, isMobile: true}))
                :
                setMobile((prevState) => ({...prevState, isMobile: false}))
        };

        setResponsiveness();


        window.addEventListener("resize",  () => setResponsiveness())
    }, []);

    const openDrawer = () => {
        return setMobile((prevState) => ({...prevState, drawer: true}));
    };

    const closeDrawer = () => {
        return setMobile((prevState) => ({...prevState, drawer: false}));
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        wallet.signOut();

        navigate('/');
        window.location.reload();
    }

    const LinksGroup = () => {
        let link;
        user ? link = links : link=conditionalLink

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
                        {
                            isMobile ?
                            <img src={Icon} alt="Logo" />
                            :
                            <img src={Logo1} alt="Logo" />
                        }
                    </NavLink>
                {
                    !isMobile &&
                    <div className="toolbar__linksContainer">
                        <LinksGroup />
                    </div>
                }
                </div>

                {
                    !user ?
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
                            <MenuItem onClick={handleClose}>{user.accountId}</MenuItem>
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