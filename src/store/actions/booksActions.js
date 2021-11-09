import * as types from '../types';


export const getBooks = (books) => {
    return {
        type: types.GET_BOOKS,
        books
    };
};
