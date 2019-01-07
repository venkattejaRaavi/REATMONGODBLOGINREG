import React from 'react';
import jwt_decode from 'jwt-decode';
import {getProfile} from './UserFunctions';
import {connect} from 'react-redux';
import { dispatch, bindActionCreators } from "redux";

class Profile extends React.Component
{   
   
    componentDidMount(){
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.props.getProfile(decoded.identity._id);
       
    }
    render()
    {
        return(
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>{this.props.first_name}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{this.props.last_name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.props.email}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{this.props.address}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
                first_name:state.user.first_name,
                last_name:state.user.last_name,
                email:state.user.email,
                address:state.user.address 
                   
            };
};
const mapDispatchToProps = (dispatch)=>{
    return {
        getProfile: bindActionCreators(getProfile, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);