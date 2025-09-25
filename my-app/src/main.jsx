import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import{Provider}from"react-redux";
import store from"./store";
import{ApiProvider}from"./ApiContext";




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <ApiProvider>

            <App />
        </ApiProvider>
    </Provider>
  </React.StrictMode>
)
