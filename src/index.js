import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './components/Root/root';

import { Provider } from 'react-redux';

import { appStore } from './store';
ReactDOM.render(
    <Provider store={appStore}>
        <Root />
    </Provider>, document.querySelector('.md')
);







