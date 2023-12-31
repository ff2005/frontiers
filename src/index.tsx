import React from 'react';
import ReactDOM from 'react-dom/client';
import Pages from './pages';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Pages />
  </React.StrictMode>
);
