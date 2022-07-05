import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Header from './components/header';
import CryptoItem from './components/cryptoItem';
import MainPage from './pages/main';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<CryptoItem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
