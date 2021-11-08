import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getBooks } from './store/actions/booksActions';
import axios from 'axios';

import Layout from "./layout/Layout";

import Homepage from './pages/Homepage/Homepage'

const Library = React.lazy(() => import("./pages/Library/Library"))

const App = () => {

    const dispatch = useDispatch();

    axios.get('https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=zf1MM73R7FJ2vPQgL25F00XEAbY4ZtJQ ')
    .then((result) => {
        console.log(result.data.results )
    }).catch((err) => {
        console.log(err)
    });

    return (                                                                                                                                                                                                                                
        <Layout>
            <Routes>
                <Route path="/" element={<Homepage />}/>

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
