import * as types from '../types';


export const getBooks = (books) => {
    return {
        type: types.GET_BOOKS,
        books
    };
};

export const getSpecifiedBooks = (books) => {
    return {
        type: types.GET_SPECIFIED_BOOKS,
        books
    };
};


export const setSpecifiedBook = (book) => {
    return {
        type: types.SET_SPECIFIED_BOOK,
        book
    };
};

export const getList = (list) => {
    return {
        type: types.GET_LIST,
        list
    };
};
