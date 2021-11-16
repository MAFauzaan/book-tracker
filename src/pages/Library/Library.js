import { useState, useEffect } from 'react';
import { Container, Button } from "@mui/material";

import CardUI from '../../components/card/Card';

import "./Library.scss";

const Library = () => {

    const [ defaultView, setDefaultView ] = useState('Reading List')

    useEffect(() => {
        //Data fetching
    }, []);

    const status = ['Reading List', 'Read', 'Finished'];

    return (  
        <Container className="container">
            <div className="container__headerComponent">
                <h1>Library</h1>
                <div className="headerComponent__buttonGroup">
                    {
                        status.map((item, index) => (
                            <Button 
                                key={index} 
                                defaultValue={item} 
                                onClick={() => setDefaultView(item)}
                            >
                                {item}
                            </Button>
                        ))
                    }
                </div>
                <hr />
            </div>
        </Container>
    );
}
 
export default Library;