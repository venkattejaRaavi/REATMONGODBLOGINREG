import React from 'react';
import {checkEmail} from './UserFunctions';
import {connect} from 'react-redux';
import { dispatch, bindActionCreators } from "redux";
class EmailVerification extends React.Component{

    componentDidMount(){

        this.props.checkEmail().then(response=>{
           if(response.status_code===200)
           {
               alert(response.message)
               this.props.history.push('/login')

           }
           else if(response.status_code===409)
           {
                alert(response.message)
                this.props.history.push('/')
           }
       })
           
    }

    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-4">Requires Email Verification</h1>
                 <p className="lead">We have sent an verification link to your Email-Id. Please go through the link to complete the register</p>
                <hr className="my-4"></hr>
                <p>The link will be expired in 2 min</p>
                
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        checkEmail: bindActionCreators(checkEmail, dispatch),
        
    }
}


export default connect(null,mapDispatchToProps)(EmailVerification);