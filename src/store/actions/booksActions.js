import * as types from '../types';


export const getList = (list) => {
    return {
        type: types.GET_LIST,
        list
    };
};

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


export const getLibraryBooks = (books) => {
    return {
        type: types.GET_LIBRARY_BOOKS,
        books
    };
};



