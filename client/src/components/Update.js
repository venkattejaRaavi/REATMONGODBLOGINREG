import _ from 'lodash';
import jwt_decode from 'jwt-decode';
import {update} from './UserFunctions';
import React from 'react';
import UpdateForm from './UpdateForm';
import {connect} from 'react-redux';
import { dispatch, bindActionCreators } from "redux";
class Update extends React.Component{
   

    onSubmit = (formValues)=>{
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.props.update(decoded.identity._id,formValues).then(res=>{this.props.history.push('/profile')});
        
        }


    render(){
        
        return(
            
                <div className="jumbotron">
                    <h3>Update your details</h3>
                    <UpdateForm
                    initialValues={_.pick(this.props.user,'first_name','last_name','email','address')} 
                    onSubmit={this.onSubmit}
                    />
                </div>
        )
    }
}

const mapStateToProps = (state)=>{
    
    return {
                user:state.user
                   
            };
};

const mapDispatchToProps = (dispatch)=>{
    return {
        update: bindActionCreators(update, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Update);