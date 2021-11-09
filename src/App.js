import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

import Catalogue from './pages/Catalogue/Catalogue'

const Library = React.lazy(() => import("./pages/Library/Library"))

const App = () => {
    return (                                                                                                                                                                                                                                
        <Layout>
            <Routes>
                <Route path="/" element={<Catalogue />}/>

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
