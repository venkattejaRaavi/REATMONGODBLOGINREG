import _ from 'lodash';
import {update} from './UserFunctions';
import React from 'react';
import UpdateForm from './UpdateForm';
import {connect} from 'react-redux';
import { dispatch, bindActionCreators } from "redux";
class Update extends React.Component{
   
    constructor(){
        super()
        this.state={'status_code':200}
    }

   
    onSubmit = (formValues)=>{
        this.props.update(formValues).then(res=>{
            this.setState({status_code: res.status_code})
            
            if(res.status_code===200)
            {   this.setState({status_code:res.status_code})
                alert(res.message)
                this.props.history.push('/profile');
            }
            else if(res.status_code===440)
            {
                alert(res.expiry_message)
                
                this.props.history.push('/')
            }
            else if(res.status_code===404)
            {
                    alert("Invalid Authorization");
                    this.setState({status_code:res.status_code})
                    localStorage.removeItem('usertoken')
                    this.props.history.push('/')



            }
        })
        
            
        
        }


    render(){

        const renderUpdate=(
                <div className="jumbotron">
                    <h3>Update your details</h3>
                    <UpdateForm
                    initialValues={_.pick(this.props.user,'first_name','last_name','email','address')} 
                    onSubmit={this.onSubmit}
                    />
                </div>
        )
        const fraudPage=(
            <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Invalid hain, fraud ... kaha se aaya reeh!</h1>
                    </div>     
            </div>
        )
        
        return(
            <div>
            {this.state.status_code===200? renderUpdate:fraudPage}
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
        update: bindActionCreators(update, dispatch),
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Update);