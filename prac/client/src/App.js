import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {

  const NewLandingPage = Auth(LandingPage, null); //아무나 출입이 가능한 페이지
  const NewLoginPage = Auth(LoginPage, false); //로그인한 유저는 출입 불가능한 페이지
  const NewRegisterPage = Auth(RegisterPage, false);
   //adminRoute 기본값이 null 
  //admin User만 들어가고 싶게 하면 true


  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element = {<NewLandingPage />} />
          <Route exact path="/login" element = {<NewLoginPage />} />
          <Route exact path="/register" element = {<NewRegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

