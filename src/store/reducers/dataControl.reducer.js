import { DATA_RECIVED,
    REQUEST_SENT,
    CHECK_DATA_IN_LS
} from '../actions/index';
import LS from './../../services/LS';
import {recivedRecommendedMovies} from '../actions/dataControl.actions';

const initialState = {
    dataLoadedFromServer: false,
    requestSentToServer: false,
    neededDataInLS: false
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
        case CHECK_DATA_IN_LS:
            console.log(action);
            action.payload.forEach((item)=>{
                if(!LS.get(item)){
                    return {neededDataInLS: false};
                }
            });
            return{neededDataInLS: true};
        default:
            return state;
    }
}