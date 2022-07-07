export const ADD_ALL_API = "ADD_ALL_API";
export const SET_MODAL = "SET_MODAL";
export const ADD_CRYPTO = "ADD_CRYPTO";
export const REMOVE_CRYPTO = "REMOVE_CRYPTO";

export const AddApiAction = (payload) => ({ type: ADD_ALL_API, payload });

export const SetModalAction = (payload) => ({ type: SET_MODAL, payload });

export const AddCryptoAction = (payload) => ({ type: ADD_CRYPTO, payload });
export const RemoveCryptoAction = (payload) => ({ type: REMOVE_CRYPTO, payload });