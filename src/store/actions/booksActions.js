import * as types from '../types';


export const getBooks = () => {
    return {
        type: types.GET_BOOKS
    };
};


export const setBooks = (books) => {
    return {
        type: types.GET_BOOKS,
        books
    };
};

