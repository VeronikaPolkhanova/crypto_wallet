import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from '../components/table';

import fetchCrypto from '../store/asyncAction';

function MainPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCrypto());
    }, [])
    const crypto = useSelector(state => state.crypto);
    return (
        <Table crypto={crypto}/>
    )
}
export default MainPage;