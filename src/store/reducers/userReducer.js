import * as types from '../types';

const initialState = {
    user: {},
    isLoggedIn: false
}

const userReducer = (state=initialState, action ) => {
    switch (action.type) {
        case types.SET_USER:
            return {isLoggedIn: true, user: action.user}

            case types.USER_LOGOUT:
            return {isLoggedIn: false, user: {}}
    
        default:
            return state;
    }
}

export default userReducer;