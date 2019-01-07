import React from 'react';
import jwt_decode from 'jwt-decode';
import {deactivate} from './UserFunctions';
import {connect} from 'react-redux';
import { dispatch, bindActionCreators } from "redux";
class Deactivate extends React.Component{

    constructor(){
        super()
        this.cancel=this.cancel.bind(this);
        this.delete=this.delete.bind(this);
    }

    delete(event){
        event.preventDefault();
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.props.deactivate(decoded.identity._id).then(res=>{
            localStorage.removeItem('usertoken')
            this.props.history.push('/')
        })
    }

    cancel(event){
        event.preventDefault();
        this.props.history.push('/profile')
    }

    render(){

    
        return (
            <div className="jumbotron">
            <h1 className="display-4">Deactivate!</h1>
            <p className="lead">Are you sure you want to deactivate your account?</p>
            <hr className="my-4"/>
    
            <p className="lead">
            <button type="button" onClick={this.delete} className="btn btn-outline-danger">Deactivate my account</button>
            <button type="button" onClick={this.cancel} className="btn btn-outline-primary">Cancel</button>
              
            </p>
            </div>
            
        )
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        deactivate: bindActionCreators(deactivate, dispatch)
    }
}

export default connect(null,mapDispatchToProps)(Deactivate);
