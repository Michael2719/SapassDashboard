import React from "react";
import "./App.css";
import { Button, Form, FormGroup, Label, Input, Card, CardImg  } from "reactstrap";
import { GoogleLoginButton } from "react-social-login-buttons";
import Login from "./Login/Login";
import Home from "./Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>     
        <Routes>
          <Route exact path="/" element={<Login/>}/>       
          <Route path ="/sapass/*" element ={<Home/>}/>
        </Routes>
   
    </Router>
  );
}

export default App;
