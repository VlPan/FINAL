import {
    TOGGLE_SIDEBAR,
    TOGGLE_FORM,
    OPEN_FORM,
    CLOSE_FORM
} from './store.types';


export function toggleSidebar(payload) {
    return {
        type: TOGGLE_SIDEBAR,
        payload
    };
}


export function toggleAddItemForm(payload) {
    return {
        type: TOGGLE_FORM,
        payload
    };
}

export function openAddItemForm(payload) {
    return {
        type: OPEN_FORM,
        payload
    };
}

export function closeAddItemForm(payload) {
    return {
        type: CLOSE_FORM,
        payload
    };
}

