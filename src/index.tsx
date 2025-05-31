import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import Game from './pages/game/game';
import Login from './pages/login/login';
import History from './pages/history/history';
import HistoryItem from './pages/historyItem/historyItem';
import App from './App';

import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<Game />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/*" element={<HistoryItem />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
