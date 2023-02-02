import './App.css';
import React from "react";
import {
BrowserRouter as Router,
Routes,
Route
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';


function App() {
return (
    <Router>
    <div>

      <Routes>
      {/* Route는 경로가 부분적으로 일치하는 컴포넌트도 렌더링하는 특성을 가지고 있기 때문이다. 
      의도치 않은 렌더링을 위해 exact를 사용한다. */}
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Routes>
    
    </div>
    </Router>
);
}

export default App;

