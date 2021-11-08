import * as types from '../types';

const initialState = {
    fetchedBooks: [],
    libraryBooks: []
};

const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_BOOKS:
            return {...state, fetchedBooks: action.books}
    
        default:
            return state;
    };
};

export default booksReducer;