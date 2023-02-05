import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { applyMiddleware} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(configureStore({Reducer}));

ReactDOM.render(
<Provider
    store={createStoreWithMiddleware(Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
>
    <App />
</Provider>
, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
