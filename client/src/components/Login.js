import React from 'react';
import {login} from './UserFunctions';
class Login extends React.Component
{
    constructor(){
        super()

        this.state={
            email: '',
            password:'',
            error : '',
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
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        login(user).then(res =>{
            console.log(res)
            if(!res.error)
            {
                this.props.history.push('/profile')
                this.setState({ error : ''})
            }
            else{
                this.setState({ error : res.error})
                console.log("Check your mailID and password === ", res.error)
                this.props.history.push('/login')
            }
        })
    }
    
    render()
    {
        
        return(
          <div className="jumbotron">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please Sign in</h1>
                            <span>{this.state.error ? this.state.error : ''}</span>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.email}
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
                                <button type="text" className="btn btn-outline-primary">
                                    Sign in
                                </button>
                        </form>
                    </div>
                </div>
          </div>  
        )
    }
} 

export default Login;