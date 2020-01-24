import React from 'react';
import Modul from './modul';
import Header from './header';
import Home from './home';
import Signup from './SignUp'
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
