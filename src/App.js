import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

import { getList } from './store/actions/booksActions';
import Layout from "./layout/Layout";
import Catalogue from './pages/Catalogue/Catalogue';

const Library = React.lazy(() => import("./pages/Library/Library"));
const LoginUI = React.lazy(() => import("./pages/Login/Login"));

const App = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.user.user);

    useEffect(() => {
        axios.get('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=zf1MM73R7FJ2vPQgL25F00XEAbY4ZtJQ')
        .then((result) => {
            const res = result.data.results;

            res.map (item => {
                return dispatch(getList(item.list_name));
            });
        });
    }, [dispatch, navigate]);

    return (                                                                                                                                                                                                                                
        <Layout>
            <Routes>
                <Route path="/" element={<Catalogue />}/>

                <Route exact path="/login" element={
                        <React.Suspense fallback={<div>Loading Page.....</div>}>
                            <LoginUI />
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
