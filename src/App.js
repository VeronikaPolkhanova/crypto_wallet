import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Header from './components/header';
import CryptoItem from './components/cryptoItem';
import Table from './components/table';

import fetchCrypto from './store/asyncAction';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCrypto());
  })
  const crypto = useSelector(state => state.crypto);
  return (
    <div className="App">
      <Header crypto={crypto} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table crypto={crypto} />} />
          <Route path="/:id" element={<CryptoItem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
