import { TOGGLE_FORM,
    OPEN_FORM,
    CLOSE_FORM,
    TOGGLE_SIDEBAR,
    OPEN_SEARCH,
    TOGGLE_SEARCH,
    CLOSE_SEARCH
} from '../actions/index';


const initialState = {
    isOpenAddForm: false,
    isOpenSidebar: false,
    isOpenSearch: false
};

export function layoutReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_FORM:
            return {
                ...state,
                isOpenAddForm: !state.isOpen
            };
        case OPEN_FORM:
            return {
                ...state,
                isOpenAddForm: true
            };
        case CLOSE_FORM:
            return {
                ...state,
                isOpenAddForm: false
            };
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                isOpenSidebar: !state.isOpenSidebar
            };
        case CLOSE_SEARCH:
            return {
                ...state,
                isOpenSearch: false
            };
        case OPEN_SEARCH:
            return{
                ...state,
                isOpenSearch: true
            };
        case TOGGLE_SEARCH:
            return{
                ...state,
                isOpenSearch: !state.isOpenSearch
            };
        default:
            return state;
    }
}

