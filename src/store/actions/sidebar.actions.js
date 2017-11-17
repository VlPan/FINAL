import { TOGGLE_SIDEBAR } from './sidebar.types';

export function toggleSidebar(payload) {
    return {
        type: TOGGLE_SIDEBAR,
        payload
    };
}

