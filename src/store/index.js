import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import cryptoReducer from './reducers/cryptoReducer';
import walletReducer from './reducers/walletReducer';
import modalReducer from './reducers/modalReducer';

const rootReducer = combineReducers({
    crypto: cryptoReducer,
    wallet: walletReducer,
    modal: modalReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;