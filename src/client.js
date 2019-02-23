import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import App from './app';
import createStore from './stores';

require('es6-promise').polyfill();

hydrate(
    <Provider store={createStore(window.__INIT_STATE__)}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

if (module.hot) {
    module.hot.accept();
}
