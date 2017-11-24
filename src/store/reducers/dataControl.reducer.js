import { DATA_RECIVED,
    REQUEST_SENT,
    CHECK_DATA_IN_LS
} from '../actions/index';
import LS from './../../services/LS';
import {recivedRecommendedMovies} from '../actions/dataControl.actions';
import {INIT_GENRES} from '../actions/dataControl.types';

const initialState = {
    dataLoadedFromServer: false,
    requestSentToServer: false
};

export function dataControlReducer(state = initialState, action, store) {
    switch (action.type) {
        case DATA_RECIVED:
            return {
                dataLoadedFromServer: true
            };
        case REQUEST_SENT:
            return {
                requestSentToServer: true
            };
        default:
            return state;
    }
}