import { INITED_TV_SHOWS, FILTER_TV_SHOWS_BY_NAME, ADD_TV_SHOW } from '../actions/index';
import {LS} from '../../services';

const initialState = {
    tvShows: [],
    initialTvShows: []
};

export function tvShowReducer(state = initialState, action) {
    switch (action.type) {
        case INITED_TV_SHOWS:
            return {
                ...state,
                tvShows: action.payload,
                initialTvShows: action.payload
            };
        case FILTER_TV_SHOWS_BY_NAME:
            if(action.payload.length === 0){
                return{
                    ...state,
                    tvShows: state.initialTvShows
                };
            }
            return{
                ...state,
                tvShows: state.initialTvShows.filter((tvShow)=>{
                    return tvShow.name.indexOf(action.payload) !== -1;
                })
            };
        case ADD_TV_SHOW:
            let adddedTvShows = LS.get('addedTvShows') || [];
            action.payload.tvShow = true;
            adddedTvShows.push(action.payload);
            LS.set('addedTvShows', adddedTvShows);
            return {
                ...state,
                tvShows: state.initialTvShows.concat(action.payload)
            };
        default:
            return state;
    }
}