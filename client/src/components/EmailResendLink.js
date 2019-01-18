import React from 'react';
import {connect} from 'react-redux';
import { dispatch, bindActionCreators } from "redux";
import {checkEmail} from './UserFunctions';
class EmailResendLink extends React.Component{
    componentDidMount(){
        console.log('in did mount')
      var data =   this.props.checkEmail().then(res =>{
        console.log("inside emailresend---",res)
        alert(res.message)
        this.props.history.push('/login')
      })
     
    }
    render(){
        return(
            <div>Inside the Email Status</div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        checkEmail: bindActionCreators(checkEmail, dispatch),
        
    }
}


export default connect(null,mapDispatchToProps)(EmailResendLink);