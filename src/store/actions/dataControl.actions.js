import {
    DATA_RECIVED,
    REQUEST_SENT,
    CHECK_DATA_IN_LS
} from './dataControl.types';

export function dataWasRecived(payload) {
    return {
        type: DATA_RECIVED,
        payload
    };
}

export function sendRequestToServer(payload) {
    return {
        type: REQUEST_SENT,
        payload
    };
}

export function checkDataInLocalStorage(payload) {
    return {
        type: CHECK_DATA_IN_LS,
        payload
    };
}
