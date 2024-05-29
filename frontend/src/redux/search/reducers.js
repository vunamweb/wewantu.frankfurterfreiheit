const initialState = {
    searchFilterData: null,
    showJobFilter:true
};

const SearchCenter = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_FILTER_DATA':
            return {
                ...state,
                searchFilterData: action.payload,
                showJobFilter: false
            };
        case 'OPEN_SEARCH_CENTER_MENU':
            return {
                ...state,
                searchFilterData: null,
                showJobFilter: true
            }
        default:
            return state;
    }
};

export default SearchCenter;