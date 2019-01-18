import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from './components/NavBar'
import  Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Update from './components/Update'
import Deactivate from './components/Deactivate'
import EmailResendLink from './components/EmailResendLink'
import EmailVerification from './components/EmailVerification'
import PhoneVerification from './components/PhoneVerification'
import VerificationPage from './components/VerificationPage'
import EnterOtp from './components/EnterOtp'
class App extends Component {
  render() {
    return (
      <Router>
        <div className= "App">
          <NavBar/>
          <Route exact path="/" component={Landing}/>
          <div className="container">
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/update" component={Update}/>
            <Route exact path="/deactivate" component={Deactivate}/>
            <Route exact path="/emailverification" component={EmailVerification}/>
            <Route exact path="/phoneverification" component={PhoneVerification}/>
            <Route exact path="/verificationpage" component={VerificationPage}/>
            <Route exact path="/resend_email_link" component = {EmailResendLink} />
            <Route exact path="/enterotp" component = {EnterOtp} />
          </div>
        </div>
      </Router>
      
    );
  }
}

export default App;
