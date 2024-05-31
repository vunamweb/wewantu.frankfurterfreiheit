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

export const setActiveTab = (tabId) => ({
	type: SET_ACTIVE_TAB,
	payload: tabId
});

export const setSearch = (search) => ({
	type: SET_SEARCH_DATA,
	payload: search
});

export const openUserSidebar = () => ({
	type: OPEN_USER_PROFILE_SIDEBAR
});

export const closeUserSidebar = () => ({
	type: CLOSE_USER_PROFILE_SIDEBAR
});

export const setconversationNameInOpenChat = (conversationName) => ({
	type: SET_CONVERSATION_NAME_IN_OPEN_CHAT,
	payload: conversationName
});

export const changeLayoutMode = layoutMode => ({
	type: SET_LAYOUT_MODE,
	payload: layoutMode,
  });


export const changeLanguage = (language) =>({
	type: CHANGE_LANGUAGE,
	payload: language
})

export const setListUserProfile = (listUserProfile) => ({
	type: SET_LIST_USER_PROFILE,
	payload: listUserProfile
})