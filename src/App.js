import React from 'react';
import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";

import Homepage from './pages/Homepage/Homepage'

const Library = React.lazy(() => import("./pages/Library/Library"))

const App = () => {
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
