import * as types from '../types';

const initialState = {
    booksList: [],
    homeDisplayedBooks: [],
    fetchedBooks: [],
    bookDetailData: {},
    libraryBooks: []
};

const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_LIST: 
            return {...state, booksList: [...state.booksList, action.list]}

        case types.GET_BOOKS:
            return {...state, homeDisplayedBooks: state.homeDisplayedBooks.concat(action.books)}
        
        case types.GET_SPECIFIED_BOOKS:
            return {...state, fetchedBooks: action.books}

        case types.SET_SPECIFIED_BOOK:
            return {...state, bookDetailData: action.book}

        default:
            return state;
    };
};

export default booksReducer;