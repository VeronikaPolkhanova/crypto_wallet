import { ADD_ALL_API } from '../actions';

const cryptoReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ALL_API:
            return [...action.payload]

        default:
            return state
    }
}
export default cryptoReducer;