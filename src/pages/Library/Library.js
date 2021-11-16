import { Container, Button } from "@mui/material";

import "./Library.scss";

const Library = () => {

    const status = ['Reading List', 'Read', 'Finished'];

    return (  
        <Container>
            <div>
                <h1>Library</h1>
                <div>
                    {
                        status.map((item, index) => (
                            <Button key={index}>{item}</Button>
                        ))
                    }
                </div>
            </div>
        </Container>
    );
}
 
export default Library;