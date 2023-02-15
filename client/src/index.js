//client/index.js 원본
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import 'antd/dist/reset.css';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

//원래는 createStore만해서 store 생성해도 되는데, store는 객체만 받아야하므로 promise와 function도 받기 위해서 
//middleware를 합친 store만들기
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)
// console.log(`applyMiddleware : ${applyMiddleware}`);
// console.log(`promiseMiddleware : ${promiseMiddleware}`);
// console.log(`ReduxThunk : ${ReduxThunk}`);
// console.log(`createStoreWithMiddleware : ${createStoreWithMiddleware}`);

//ReactDom : React코드를 DOM (Document Object Model) 에 붙이는 역할
//DOM: HTML 요소들의 구조화된 표현
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // npx로 react를 실행하면 strictmode생김
  // 렌더링 보다 커밋이 더 빠른데, 렌더링에서 메소드가 중복 호출되는 경우(useState사용시 발생 가능성) 이를 방지 
  // 1. Rendering : react 는 무엇을 display해야 하는지 component에게 요청함
  // 2. Committing: rendering 후, react가 DOM을 수정
  //strict mode는 개발 과정에만 적용, 배포후에는 작동x 
  <React.StrictMode>
    {/* App에 redux(state 관리)를 연결하기 위해 Provider(store에 접근할 수 있도록) */}
    <Provider 
    // state을 감싸주는 store
      store={createStoreWithMiddleware(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//Create-react-app default file: 앱의 퍼포먼스시간들을 분석
reportWebVitals();