import { useState, useEffect } from 'react';
import { Container, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getLibraryBooks } from '../../store/actions/booksActions';

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BookIcon from '@mui/icons-material/Book';
import DoneIcon from '@mui/icons-material/Done';

import LibCard from '../../components/card/LibCard';
import LibBookDetailModal from '../../components/modal/bookDetail/LibBookDetailModal';

import "./Library.scss";

const Library = ({ contract, wallet, currentUser  }) => {
    const dispatch = useDispatch();
    const libBooks = useSelector(state => state.books.libraryBooks);
    const user = currentUser || 'none';

    if ( user === 'none' ) {
        window.location.replace("/");
    };

    const [ defaultView, setDefaultView ] = useState('List');
    const [ bookDetail, setBookDetail ] = useState({
        data: {},
        open: false
    });


    useEffect(() => {
        if (wallet.isSignedIn()) {
            contract.get_books({"account_id": `${user.accountId}`, "skip":0, "limit": 10})
            .then((result) => {
                console.log(result);
                dispatch(getLibraryBooks(result));
            }).catch((err) => {
                console.log(err)
            });
        };
    }, [contract, user.accountId, wallet, dispatch]);

    const status = [
        {
            label: 'List',
            icon: <FormatListBulletedIcon fontSize='medium'/>
        },
        {
            label: 'Read',
            icon: <BookIcon fontSize='medium'/>
        },
        {
            label: 'Finished',
            icon: <DoneIcon fontSize='medium'/>
        }
    ];

    return (  
        <Container className="container">
            <div className="container__headerComponent">
                <h1><LocalLibraryIcon fontSize='large'/> My Library</h1>
                <div className="headerComponent__buttonGroup">
                    {
                        status.map((item, index) => (
                            <Button 
                                key={index} 
                                defaultValue={item} 
                                onClick={() => setDefaultView(item.label)}
                                sx={item.label === defaultView ? {backgroundColor: '#2c2c2c', color: '#ffff'} : null}
                            >
                                {item.icon}
                                {item.label}
                            </Button>
                        ))
                    }
                </div>
                <hr />
            </div>

            <Grid container spacing={4} sx={{display: 'flex', placeContent: 'center'}}>
                   {
                       libBooks.map(book => {
                           const status = book.status;

                           return status === defaultView &&
                            <Grid item sx={12} sm={6} md={4} lg={3}  className="container__bookContainer">
                                <LibCard key={book.book_id} libData={book} setBookDetail={setBookDetail}/>
                            </Grid>
                       })
                   }
            </Grid>
            {
                bookDetail.open &&
                <LibBookDetailModal 
                    id="library" 
                    modal={bookDetail}                  
                    setModal={setBookDetail}
                    contract={contract}
                    currentUser={currentUser}
                />
            }
        </Container>
    );
}
 
export default Library;