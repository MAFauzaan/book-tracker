import { Card } from "@mui/material";
import { Link } from "react-router-dom";

import "../../../components/card/Card.scss"
import "./style.scss"

const seeMore = (props) => {
    return(
        <Link to={`/catalogue/${props.listName}`} style={{textDecoration: 'none'}}> 
            <Card className="card seeMore" sx={{display: 'flex', placeItems: 'center'}}>
                <h2>See More</h2>
            </Card>
        </Link>
    );
};

export default seeMore;