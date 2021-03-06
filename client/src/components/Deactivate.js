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
        this.state={'status_code':200}
    }

    delete(event){
        event.preventDefault();
        this.props.deactivate().then(res=>{
            if(res.status_code==200){
                alert(res.message)
                this.setState({status_code:res.status_code})
                localStorage.removeItem('usertoken')
                this.props.history.push('/')
            }
            else if(res.status_code===440)
            {
                alert(res.expiry_message)
               
                this.props.history.push('/')
            }
            else if(res.status_code==404){
                alert("Invalid Authorization");
                    this.setState({status_code:res.status_code})
                    localStorage.removeItem('usertoken')
                    this.props.history.push('/')

            }
            
        })
    }

    cancel(event){
        event.preventDefault();
        this.props.history.push('/profile')
    }

    render(){
            const renderDelete=(
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
            const fraudPage=(
                <div className="jumbotron mt-5">
                        <div className="col-sm-8 mx-auto">
                            <h1 className="text-center">Invalid hain, fraud ... kaha se aaya reeh!</h1>
                        </div>     
                </div>
            )
    
        return (
            
            <div>
                {this.state.status_code===200? renderDelete:fraudPage}
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
