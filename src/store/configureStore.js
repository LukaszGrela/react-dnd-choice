import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store creation
export default () => {
    const store = createStore(
        combineReducers({
            data: {}
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}