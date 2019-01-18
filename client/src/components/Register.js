import React from 'react';
import {register} from './UserFunctions';

class Register extends React.Component
{
    constructor(){
        super()

        this.state={
            first_name:'',
            last_name:'',
            email: '',
            address:'',
            password:''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e)
    {
        e.preventDefault()
        const newUser = {
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            email: this.state.email,
            address:this.state.address,
            password: this.state.password
        }
        register(newUser).then(res =>{

            if(res.status_code === 409)
            {
                alert(res.message)
                this.props.history.push('/login')
            }
            else if(res.status_code === 200)
            this.props.history.push('/verificationpage')
        })
    }
    
    render() {
        return(
          <div className="jumbotron">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="first_name"
                                    placeholder="Enter First name"
                                    value={this.state.first_name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="last_name"
                                    placeholder="Enter Last name"
                                    value={this.state.last_name}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter e-mail address"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="address"
                                    className="form-control"
                                    name="address"
                                    placeholder="Enter address"
                                    value={this.state.address}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                            </div>
                                <button type="submit" className="btn btn-outline-primary">
                                    Register
                                </button>
                        </form>
                    </div>
                </div>
          </div>  
        )
    }
} 

export default Register;