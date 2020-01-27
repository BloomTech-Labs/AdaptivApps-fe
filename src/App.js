import React from 'react';
import Modul from './components/AccessibilityModal';
import Header from './components/Header';
import Home from './components/LandingPage';
import Signup from './components/users/SignUp'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Modul />
      <Route exact path="/" component={Home} />
      <Route exact path="/Signup" component={Signup} />
    </div>
  );
}

export default App;
