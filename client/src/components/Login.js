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
            if(res.status_code===200){
                this.setState({ error : ''})
                localStorage.setItem('usertoken', res.token)
                this.props.history.push('/profile')
            }
            else if(res.status_code===400)
            {
                
                this.setState({ error : res.message})
            }
            else if(res.status_code===401){
                this.setState({ error : ''})
                alert(res.message)
                this.props.history.push('/verificationpage')
            }
            else if(res.status_code===404){
                this.setState({ error : res.message})
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
                                <span>{this.state.error ? this.state.error : ''}</span>
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