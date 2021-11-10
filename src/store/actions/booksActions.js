import * as types from '../types';


export const getBooks = (books) => {
    return {
        type: types.GET_BOOKS,
        books
    };
};

export const getList = (list) => {
    return {
        type: types.GET_LIST,
        list
    };
};
