import React from 'react';
import {sendOTP} from './UserFunctions';
import {connect} from 'react-redux';
import { dispatch, bindActionCreators } from "redux";
class PhoneVerification extends React.Component{
    constructor(){
        super()
        this.onSubmit=this.onSubmit.bind(this)
        this.updatePhone=this.updatePhone.bind(this)
        this.state={
            phone:null
        }
        

        
    }
    updatePhone(e)
    {  
        e.preventDefault()
        var name = e.target.name
        this.setState({[e.target.name]: e.target.value})
    }
    
    onSubmit(e){
        e.preventDefault();
        const user_phone={
            phone:this.state.phone
        }
        this.props.sendOTP(user_phone).then(res=>{
            if(res.status_code === 200){
                alert(res.message)
                localStorage.setItem('sms_token',res.sms_token)
                this.props.history.push('/enterotp')
            }
            else if(res.status_code === 422){
                alert(res.message)
                this.props.history.push('/phoneverification')
            }
           
        })
       
    }
    render(){
        return(
            <div className="jumbotron">
               <form onSubmit={this.onSubmit}>
                
                    <div className="form-group">
                         <label for="Phone number">Enter your phone number</label>
                         <input type="phone"
                          class="form-control"
                           id="exampleInputPassword1" 
                           placeholder="Enter your phone number"
                           name="phone"
                           value={this.state.phone}
                            onChange={this.updatePhone}/>
                    </div>
  
                    <button type="submit" class="btn btn-primary">Send OTP</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        sendOTP: bindActionCreators(sendOTP, dispatch),
        
    }
}

export default connect(null,mapDispatchToProps)(PhoneVerification);
