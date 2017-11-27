import {
    DATA_RECIVED,
    REQUEST_SENT
} from '../actions/index';

const initialState = {
    dataLoadedFromServer: false,
    requestSentToServer: false,
    fetchingData: false
};

export function dataControlReducer(state = initialState, action, store) {
    switch (action.type) {
        case DATA_RECIVED:
            return {
                ...state,
                dataLoadedFromServer: true,
                fetchingData: false
            };
        case REQUEST_SENT:
            return {
                ...state,
                requestSentToServer: true,
                fetchingData: true
            };
        default:
            return state;
    }
}