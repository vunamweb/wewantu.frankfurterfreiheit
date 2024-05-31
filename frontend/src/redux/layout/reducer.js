// @flow
import {
	SET_ACTIVE_TAB,
	OPEN_USER_PROFILE_SIDEBAR,
	CLOSE_USER_PROFILE_SIDEBAR,
	SET_CONVERSATION_NAME_IN_OPEN_CHAT,
	SET_LAYOUT_MODE,
	SET_SEARCH_DATA,
	CHANGE_LANGUAGE,
	SET_LIST_USER_PROFILE
} from "./constants";

const INIT_STATE = {
	activeTab: "jobs",
	userSidebar: false,
	conversationName: "Admin",
	layoutMode: "light",
	dataSearch: null,
	language: "de",
	listUserProfile: null
};

const Layout = (state = INIT_STATE, action) => {
	switch (action.type) {
		case SET_ACTIVE_TAB:
			return {
				...state,
				activeTab: action.payload
			};

		case SET_SEARCH_DATA:
			return {
				...state,
				dataSearch: action.payload
			};

		case OPEN_USER_PROFILE_SIDEBAR:
			return {
				...state,
				userSidebar: true
			};

		case CLOSE_USER_PROFILE_SIDEBAR:
			return {
				...state,
				userSidebar: false
			};

		case SET_CONVERSATION_NAME_IN_OPEN_CHAT:
			return {
				...state,
				conversationName: action.payload
			};

		case CHANGE_LANGUAGE:
			return {
				...state,
				language: action.payload
			}
		case SET_LAYOUT_MODE:
			return {
				...state,
				layoutMode: action.payload
			};
		case SET_LIST_USER_PROFILE:
			return {
				...state,
				listUserProfile: action.payload
			}
		default:
			return state;
	}
};

export default Layout;
