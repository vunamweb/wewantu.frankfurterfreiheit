import {
    CHAT_USER,ACTIVE_USER,FULL_USER, ADD_LOGGED_USER, CREATE_GROUP,
    NEW_MESSAGE,
    READ_MESSAGE
} from './constants';


export const chatUser = () => ({
    type: CHAT_USER
});

export const activeUser = (userId) => ({
    type: ACTIVE_USER,
    payload : userId
});

export const setFullUser = (fullUser) => ({
    type: FULL_USER,
    payload : fullUser
});

export const newMessage = () => ({
    type: NEW_MESSAGE
})

export const readMessage = () => ({
    type: READ_MESSAGE
})

export const addLoggedinUser = (userData) => ({
    type: ADD_LOGGED_USER,
    payload : userData
});

export const createGroup = (groupData) => ({
    type : CREATE_GROUP,
    payload : groupData
});
