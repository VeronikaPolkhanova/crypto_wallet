import { AddApiAction } from './actions';

const fetchCrypto = () => {
    return function (dispatch) {
        fetch("https://api.coincap.io/v2/assets", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(json => json.json()).then(json => dispatch(AddApiAction(json.data)))
    }
}
export default fetchCrypto;