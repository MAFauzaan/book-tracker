import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from 'axios'

import { getList } from './store/actions/booksActions';
import Layout from "./layout/Layout";
import Catalogue from './pages/Catalogue/Catalogue';

const Library = React.lazy(() => import("./pages/Library/Library"));
const LoginUI = React.lazy(() => import("./pages/Login/Login"));

const App = ({ contract, currentUser, nearConfig, wallet }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=zf1MM73R7FJ2vPQgL25F00XEAbY4ZtJQ')
        .then((result) => {
            const res = result.data.results;

            res.map (item => {
                return dispatch(getList(item.list_name));
            });
        });
    }, [dispatch, navigate]);

    console.log(currentUser)

    return (                                                                                                                                                                                                                                
        <Layout wallet={wallet}> 
            <Routes>
                <Route path="/" element={<Catalogue contract={contract} currentUser={currentUser} />}/>

                <Route exact path="/login" element={
                        <React.Suspense fallback={<div>Loading Page.....</div>}>
                            <LoginUI nearConfig={nearConfig} wallet={wallet} currentUser={currentUser}/>
                        </React.Suspense>
                }/>

                <Route path="/library" element={
                        <React.Suspense fallback={<div>Loading Page.....</div>}>
                            <Library />
                        </React.Suspense>
                    }/>
                </Routes>
        </Layout>
    );
}
 
export default App;
