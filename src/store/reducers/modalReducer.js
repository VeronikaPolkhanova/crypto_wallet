import { SET_MODAL } from '../actions';

const modalReducer = (state = {
    isOpen: false,
    payload: []
}, action) => {
    switch (action.type) {
        case SET_MODAL:
            return { ...action.payload }

        default:
            return state
    }
}
export default modalReducer;