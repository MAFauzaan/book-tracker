import * as types from '../types';

export const setUserLoginData = (user) => {
    return {
        type: types.SET_USER,
        user
    }
}

export const userLogout = () => {
    return {
        type: types.USER_LOGOUT,
    }
}