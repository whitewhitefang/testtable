import React from 'react';
import ReactDOM from 'react-dom/client';
import { TableContextProvider } from './store/table-context';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TableContextProvider>
    <App />
  </TableContextProvider>
);