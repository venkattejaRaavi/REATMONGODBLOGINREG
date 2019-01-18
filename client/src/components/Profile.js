import React from 'react';
import { getProfile } from './UserFunctions';
import { connect } from 'react-redux';
import { dispatch, bindActionCreators } from "redux";

class Profile extends React.Component {
    constructor() {
        super()
        this.state = { 'status_code': 200 }
    }
    componentDidMount() {
        this.props.getProfile().then(res => {
            if(res.status_code ===200)
            {
            this.setState({ status_code: res.status_code })
            }
            else if(res.status_code === 440)
            alert(res.expiry_message)
           
        });

    }
  

    render() {
        const profileData = (
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
        const fraudPage = (

            <div className="jumbotron mt-5">
                <div className="col-sm-8 mx-auto">
                    <h1 className="text-center">Invalid hain, fraud ... kaha se aaya reeh!</h1>
                    
                </div>
            </div>
            
        )
        return (
            <div>

                {this.state.status_code === 200 ? profileData : fraudPage}

            </div>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        first_name: state.user.first_name,
        last_name: state.user.last_name,
        email: state.user.email,
        address: state.user.address

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: bindActionCreators(getProfile, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);