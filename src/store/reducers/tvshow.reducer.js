import {
    INITED_TV_SHOWS,
    FILTER_TV_SHOWS_BY_NAME,
    ADD_TV_SHOW,
    FILTER_TV_SHOWS_ADVANCED
} from '../actions/index';
import {LS, customLib} from '../../services';

const initialState = {
    tvShows: [],
    initialTvShows: [],
    fullTvShows: []
};

export function tvShowReducer(state = initialState, action) {
    switch (action.type) {
        case INITED_TV_SHOWS:
            let tvShows, initialTvShows, fullTvShows;
            let filterOptions = LS.get('filterOptionsTvs') || null;
            tvShows = initialTvShows = fullTvShows = action.payload;
            console.log(fullTvShows);
            if(filterOptions){
                initialTvShows = tvShows = customLib.filterArray(tvShows, filterOptions);
            }
            console.log(tvShows);
            console.log(fullTvShows);
            return {
                ...state,
                tvShows,
                initialTvShows,
                fullTvShows
            };
        case FILTER_TV_SHOWS_BY_NAME:
            if (action.payload.length === 0) {
                return {
                    ...state,
                    tvShows: state.initialTvShows
                };
            }
            return {
                ...state,
                tvShows: state.initialTvShows.filter((tvShow) => {
                    return tvShow.name.trim().toLowerCase().indexOf(action.payload.trim().toLowerCase()) !== -1;
                })
            };
        case ADD_TV_SHOW:
            let adddedTvShows = LS.get('addedTvShows') || [];
            action.payload.tvShow = true;
            adddedTvShows.push(action.payload);
            LS.set('addedTvShows', adddedTvShows);
            return {
                ...state,
                fullTvShows: state.fullTvShows.concat(action.payload),
                tvShows: state.initialTvShows.concat(action.payload)
            };
        case FILTER_TV_SHOWS_ADVANCED:
            console.log('FILTER ITEMS ADVANCED');
            filterOptions = action.payload;
            if(action.payload.rememberInputs) {
                localStorage.removeItem('filterOptionsTvs');
                LS.set('filterOptionsTvs', filterOptions);
            }
            let arrToFilter = state.fullTvShows;
            console.log('arrToFilter', arrToFilter);

            arrToFilter = customLib.filterArray(arrToFilter, filterOptions);

            return {
                ...state,
                tvShows: arrToFilter,
                initialTvShows: arrToFilter
            };
        default:
            return state;
    }
}