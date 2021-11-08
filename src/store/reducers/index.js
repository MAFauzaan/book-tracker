import { combineReducers } from "redux";

import booksReducer from "./booksReducers";


const reducers = combineReducers({
    books: booksReducer
})

export default reducers;