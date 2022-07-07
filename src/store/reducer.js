import { ADD_ALL_API, ADD_CRYPTO, REMOVE_CRYPTO } from './actions';

const defaultState = {
    crypto: [],
    wallet: []
}

const reducer = (state = defaultState, action) => {
    console.log(state.wallet);
    switch (action.type) {
        case ADD_ALL_API:
            return { ...state, crypto: [...action.payload] }

        case ADD_CRYPTO:
            if (state.wallet.length !== 0 && state.wallet.find(it => it.data.id === action.payload.data.id)) {
                return { ...state, wallet: state.wallet.map(it => it.data.id === action.payload.data.id ? { ...it, count: +it.count + +action.payload.count } : it) }
            }
            else {
                return { ...state, wallet: [...state.wallet, action.payload] }
            }

        case REMOVE_CRYPTO:
            return { ...state, wallet: state.wallet.filter(it => it.data.id !== action.payload) }

        default:
            return state
    }
}
export default reducer;