import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    API_FAILED,
    UPDATE_CREDITS,
    REDIRECT_TO_LOGIN,
    REGISTER_VALIDATE,
    REGISTER_INVALID,
    REGISTER_VALID
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
    isUserLogout : false,
    success: false
};


const Auth = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loading: true };
        
        case UPDATE_CREDITS:
            return { ...state, user: action.payload, loading: false, error: null };
        case LOGIN_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };

        case REGISTER_USER:
            return { ...state, loading: true };
        case REGISTER_USER_SUCCESS:
            return { ...state, user: action.payload, success: true, loading: false, error: null };

        case LOGOUT_USER_SUCCESS:
            return { ...state, user: null, isUserLogout : true };

        case FORGET_PASSWORD:
            return { ...state, loading: true };
        case FORGET_PASSWORD_SUCCESS:
            return { ...state, passwordResetStatus: action.payload, loading: false, error: null };

        case API_FAILED:
            return { ...state, loading: false, error: action.payload, isUserLogout : false };

        case REDIRECT_TO_LOGIN:
            return {...state, success: false, user: null, error:null};
        case REGISTER_VALIDATE:
            return {...state, success: false, loading: true, user: null, error:null};
        case REGISTER_INVALID:
            return {...state, success: false, loading: false, error:action.payload}
        case REGISTER_VALID:
            return {...state, success: false, loading: false, error:null}
        default: return { ...state };
    }
}

export default Auth;