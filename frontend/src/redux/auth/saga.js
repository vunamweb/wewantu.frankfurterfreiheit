import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { APIClient } from '../../helpers/apiClient';

//firebase
import { getFirebaseBackend } from "../../helpers/firebase";


import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    FORGET_PASSWORD,
    REGISTER_VALIDATE
} from './constants';


import {
    loginUserSuccess,
    registerUserSuccess,
    forgetPasswordSuccess,
    apiError,
    logoutUserSuccess,
    registerInvalid
} from './actions';
import { toast } from 'react-toastify';

/**
 * Sets the session
 * @param {*} user 
 */

const create = new APIClient().create;
const vapidKey = 'BFbUxUhsl2AN7BAnB-iQBJVhRDSCIBZiMS3ab3CFAApXYrpvRdFKOcM8tMvl3vJn1k98GDRDxIW1Qe8EqhKN4vs';

/**
 * Login the user
 * @param {*} payload - username and password 
 */
function* login({ payload: { username, password, history } }) {
    try {

        //yield call(fireBaseBackend.G, username, password);
        const response_auth = yield call(new APIClient().auth, 'login', { username: username, password: password });
        if (response_auth) {
            // get instace of firebase
            const fireBaseBackend = getFirebaseBackend();

            try {
                //const messaging = fireBaseBackend.getMessaging();

                fireBaseBackend.getMessaging().getToken({ vapidKey: vapidKey})
                    .then(function (token) {
                        console.log(token);

                        fireBaseBackend.getMessaging().onMessage((payload) => {
                            console.log('Message received. ', payload);
                            // Show notification using the Notification API
                            new Notification(payload.notification.title, {
                                body: payload.notification.body,
                                icon: payload.notification.icon,
                            });
                        });

                    })
            } catch (error) {
                console.log(error);
            }

            //setAuthorization(response_auth.session_secret)
            localStorage.setItem("session_secret", JSON.stringify(response_auth));
            const user = yield call(new APIClient().get, 'user/' + response_auth.user_id);
            //console.log(user);
            user.token = response_auth.session_secret;
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
        yield call(new APIClient().delete, 'logout');

    } catch (error) { console.log(error); }
}

/**
 * Register the user
 */
function* register({ payload: { user } }) {
    try {
        const response = yield call(create, "/register_validate", { user });
        if (response.check) {
            const address = {
                city: user.city,
                postal_code: user.zip,
                street: user.street,
                house_number: user.no,
                address_addition: "",
                country: user.country
            }
            const responseAddress = yield call(create, "/address", address);
            if (responseAddress) {
                const userData = {
                    salutation: user.salutation,
                    titel: user.titel,
                    prename: user.prename,
                    lastname: user.lastname,
                    username: user.username,
                    mobile_phone_number: user.mobile_phone_number,
                    mail: user.mail,
                    password: user.password,
                    address_id: responseAddress.address_id
                }
                const response = yield call(create, '/user', userData);
                // response.success = true;
                // const user = response;
                yield put(registerUserSuccess(user));
            }
        }
        else {
            const errorText = "Account or phone number already exists";
            yield put(registerInvalid(errorText));
        }


    } catch (error) {
        yield put(apiError(error));
    }
}

function* register_validate({ payload: { user } }) {
    try {
        const response = yield call(create, "/register_validate", { user });

    }
    catch (error) {
        const errorText = "Account or phone number already exists";
        yield put(registerInvalid(errorText));
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


export function* watchRegisterValidate() {
    yield takeEvery(REGISTER_VALIDATE, register_validate);
}

function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchForgetPassword),
        fork(watchRegisterValidate)
    ]);
}

export default authSaga;