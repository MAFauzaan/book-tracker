import * as types from '../types';

const initialState = {
    booksList: [],
    fetchedBooks: [],
    libraryBooks: []
};

const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_LIST: 
            return {...state, booksList: [...state.booksList, action.list]}

        case types.GET_BOOKS:
            return {...state, fetchedBooks: state.fetchedBooks.concat(action.books)}
    
        default:
            return state;
    };
};

export default booksReducer;