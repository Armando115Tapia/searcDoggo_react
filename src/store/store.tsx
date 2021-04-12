import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

// Import reducers and state type
import { IDogState, dogReducer } from '../reducers/dogReducer';

// Create an interface for the application state
export interface IAppState {
    dogState: IDogState
}

// Create the root reducer
const rootReducer = combineReducers<IAppState>({
    dogState: dogReducer
});

// Create a configure store function of type `IAppState`
export default function configureStore(): Store<IAppState, any> {
    const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
    return store;
}