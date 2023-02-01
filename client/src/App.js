import './App.css';
import React from "react";
import {
BrowserRouter as Router,
Routes,
Route,
Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';


function App() {
return (
    <Router>
    <div>

        <hr />

        <Routes>
          <Route exact path="/">
            <LandingPage/>
          </Route>
            
          <Route path="/about">
            
          </Route>

          <Route path="/dashboard">
          </Route>
        
        </Routes>
    </div>
    </Router>
);
}

export default App;

