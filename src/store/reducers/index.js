import { combineReducers } from "redux";

import booksReducer from "./booksReducers";
import userReducer from "./userReducer";

const reducers = combineReducers({
    books: booksReducer,
    user: userReducer
})

export default reducers;