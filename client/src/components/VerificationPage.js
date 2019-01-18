import React from 'react';

class VerificationPage extends React.Component{

    constructor(){
        super()
        this.verifyEmail=this.verifyEmail.bind(this);
        this.verifyPhone=this.verifyPhone.bind(this);
    }
    verifyEmail(e){
        e.preventDefault();
        this.props.history.push('/emailverification')
    }
    verifyPhone(e){
        e.preventDefault();
        this.props.history.push('/phoneverification')
    }

    render(){
        return(
            <div className="jumbotron">
            <h1 className="display-4">Need Verification</h1>
            <p className="lead">Email Verification</p>
            <a className="btn btn-outline-primary" onClick={this.verifyEmail} href="#" role="button">Verify with Email</a>
            <hr className="my-4"/>
            <p className="lead">Phone Verification</p>
            <a className="btn btn-outline-secondary" onClick={this.verifyPhone} href="#" role="button">Verify with SMS</a>
          </div>
        )
    }
}

export default VerificationPage