import { ADD_CRYPTO, REMOVE_CRYPTO } from '../actions';

const walletReducer = (state = [], action) => {
    switch (action.type) {

        case ADD_CRYPTO:
            if (state.length !== 0 && state.find(it => it.data.id === action.payload.data.id)) {
                return state.map(it => it.data.id === action.payload.data.id ? { ...it, count: +it.count + +action.payload.count } : it) 
            }
            else {
                return  [...state, action.payload] 
            }

        case REMOVE_CRYPTO:
            return state.filter(it => it.data.id !== action.payload) 

        default:
            return state
    }
}
export default walletReducer;