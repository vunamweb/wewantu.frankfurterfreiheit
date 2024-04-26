import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { APIClient } from '../../helpers/apiClient';


import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    FORGET_PASSWORD
} from './constants';


import {
    loginUserSuccess,
    registerUserSuccess,
    forgetPasswordSuccess,
    apiError,
    logoutUserSuccess
} from './actions';




/**
 * Sets the session
 * @param {*} user 
 */

const create = new APIClient().create;

/**
 * Login the user
 * @param {*} payload - username and password 
 */
function* login({ payload: { username, password, history } }) {
    try {
       
            //yield call(fireBaseBackend.G, username, password);
            const response_auth = yield call(new APIClient().auth, 'login', {username:username,password:password});
			if(response_auth){
                //setAuthorization(response_auth.session_secret)
                localStorage.setItem("session_secret", JSON.stringify(response_auth));
                const user = yield call(new APIClient().get,'user/'+response_auth.user_id);
                //console.log(user);
                user.token=response_auth.session_secret;
                //yield call(new APIClient().delete,'logout');
                //user.role='role';
                //user.id=1;
                //console.log(user);
                localStorage.setItem("authUser", JSON.stringify(user));
                //console.log(localStorage);
                yield put(loginUserSuccess(user));
            }
           
            
     
        history('/messagecenter');
    } catch (error) {
        yield put(apiError(error));
    }
}


/**
 * Logout the user
 * @param {*} param0 
 */
function* logout({ payload: { history } }) {
    try {        
            localStorage.removeItem("authUser");
            localStorage.removeItem("session_secret");            
            yield put(logoutUserSuccess(true));
            yield call(new APIClient().delete,'logout');
       
    } catch (error) { console.log(error);}
}

/**
 * Register the user
 */
function* register({ payload: { user } }) {
    try {
       
            const response = yield call(create, '/user', user);
            yield put(registerUserSuccess(response));
            if(response){
               /*const response_auth = yield call(new APIClient().auth, 'login', {username:email,password:password});
                if(response_auth){
                    const user = yield call(new APIClient().get,'user/'+response_auth.user_id);
                    user.token=response_auth.session_secret;
                    yield call(new APIClient().delete,'logout');
                    localStorage.setItem("authUser", JSON.stringify(user));
                    yield put(registerUserSuccess(user));
                }*/
            }
            
    } catch (error) {
        yield put(apiError(error));
    }
}

/**
 * forget password
 */
function* forgetPassword({ payload: { email } }) {
    try {
       
            const response = yield call(create, '/forget-pwd', { email });
            yield put(forgetPasswordSuccess(response));

    } catch (error) {
        yield put(apiError(error));
    }
}


export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword() {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchForgetPassword),
    ]);
}

export default authSaga;