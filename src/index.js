import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContextProvider } from './context/ContextProvider';

ReactDOM.render(
  <ContextProvider>
    {/* <BrowserRouter> */}
    <App />
    {/* </BrowserRouter> */}
  </ContextProvider>,
  document.getElementById('root'));
