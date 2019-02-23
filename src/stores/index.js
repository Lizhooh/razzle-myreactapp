import { configureStore } from 'redux-starter-kit';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

const logger = () => next => action => {
    const start = Date.now();
    const result = next(action);
    const end = Date.now();

    console.log(
        `%c${action.type}  %c+${(end - start)}ms`,
        'color:black;font-weight: 600;',
        'color:green;font-weight: 600;'
    );

    return result;
};

const createStore = state => configureStore({
    devTools: true,
    reducer: reducers,
    middleware: [thunk, logger],
    preloadedState: state,
});

export default createStore;
