import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { appReducers } from './reducers/index';
import { logger } from './middleware/index';
import { movieInniter, tvShowsInniter, genresInniter } from './middleware/index';

export const appStore = createStore(
    appReducers,
    composeWithDevTools(
        applyMiddleware(store => next => action =>
            typeof action === 'function'
                ? action(store.dispatch, store.getState)
                : next(action), logger, movieInniter, tvShowsInniter, genresInniter
        )
    )
);

// export default appStore;