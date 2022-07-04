import { ADD_ALL_API } from './actions';

const defaultState = {
    crypto: [],
    wallet: []
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {

        case ADD_ALL_API:
            return { ...state, crypto: [...action.payload] }

        default:
            return state
    }
}
export default reducer;