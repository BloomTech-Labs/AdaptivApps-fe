import React from "react";
import AccessibilityModal from "./components/AccessibilityModal";
import Header from "./components/Header";
import Home from "./components/LandingPage";
import Signup from "./components/users/SignUp";
import UserDashboard from "./components/users/UserDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import PrivateRoute from "./utils/PrivateRoute";
import Login from './components/Login';
import Logout from './components/Logout';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditProfile from './components/ProfileForm'
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <AccessibilityModal />
      <Route exact path="/Edit" component={EditProfile} />
      <Route exact path="/" component={Home} />
      <Route exact path="/Signup" component={Signup} />
      <Route exact path="/SignIn" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <PrivateRoute exact path="/dashboard/admin" component={AdminDashboard} />
      <PrivateRoute exact path="/dashboard" component={UserDashboard} />

    </div>
  );
}

export default App;
