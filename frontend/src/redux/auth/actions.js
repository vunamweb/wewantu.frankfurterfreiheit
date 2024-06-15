import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    API_FAILED,
    REDIRECT_TO_LOGIN,
    REGISTER_VALIDATE,
    REGISTER_INVALID,
    REGISTER_VALID,
    UPDATE_CREDITS
} from './constants';

export const loginUser = (username, password, history) => ({
    type: LOGIN_USER,
    payload: { username, password, history }
});

export const loginUserSuccess = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user
});

export const registerUser = (user) => ({
    type: REGISTER_USER,
    payload: { user }
});

export const registerUserSuccess = (user) => ({
    type: REGISTER_USER_SUCCESS,
    payload: user
});

export const logoutUser = (history) => ({
    type: LOGOUT_USER,
    payload: { history }
});

export const logoutUserSuccess = () => {
    return {
      type: LOGOUT_USER_SUCCESS,
      payload: {},
    };
  };

export const forgetPassword = (email) => ({
    type: FORGET_PASSWORD,
    payload: { email }
});

export const forgetPasswordSuccess = (passwordResetStatus) => ({
    type: FORGET_PASSWORD_SUCCESS,
    payload: passwordResetStatus
});

export const apiError = (error) => ({
    type: API_FAILED,
    payload: error
});

export const redirectToLogin = () => ({
    type: REDIRECT_TO_LOGIN,
    payload:{}
})

export const registerValidate = (user) => ({
    type: REGISTER_VALIDATE,
    payload: {user}
});

export const registerInvalid = (error) => ({
    type: REGISTER_INVALID,
    payload: error
});

export const registerValid = () => ({
    type: REGISTER_VALID,
    payload: {}
})

export const updateCredits = (user) => ({
    type: UPDATE_CREDITS,
    payload: user
})