import React from 'react';
import {verifyOTP} from './UserFunctions';
import {connect} from 'react-redux';
import { dispatch, bindActionCreators } from "redux";
class EnterOtp extends React.Component{

    constructor(){
        super()
        this.onSubmit=this.onSubmit.bind(this)
        this.updateOTP=this.updateOTP.bind(this)
        this.state={
            otp:null
        }  
    }
    updateOTP(e)
    {  
        e.preventDefault()
        var name = e.target.name
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e){
        e.preventDefault();
        const user_otp={
            otp:this.state.otp
        }
        this.props.verifyOTP(user_otp).then(res=>{
            if(res.status_code === 200){
                alert(res.message)
                this.props.history.push('/login')
            }
            else if(res.status_code === 409){
                alert(res.message)
                this.props.history.push('/login')
            }
            else if(res.status_code === 406){
                alert(res.message)                
            }
            else if(res.status_code === 440){
                alert(res.message)
                localStorage.removeItem('sms_token')
                this.props.history.push('/phoneverification')             
            }
        })
       
    }

    render(){
        return(
            <div>
                    <div className="jumbotron">
               <form onSubmit={this.onSubmit}>
                
                    <div className="form-group">
                         <label for="Phone number">Enter the OTP</label>
                         <input type="phone"
                          class="form-control"
                           id="OTP" 
                           placeholder="Enter the OTP"
                           name="otp"
                           value={this.state.otp}
                            onChange={this.updateOTP}/>
                    </div>
  
                    <button type="submit" class="btn btn-primary">Send OTP</button>
                </form>
            </div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch)=>{
    return {
        verifyOTP: bindActionCreators(verifyOTP, dispatch),
        
    }
}

export default connect(null,mapDispatchToProps)(EnterOtp);
